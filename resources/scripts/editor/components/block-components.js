import {
  TextControl,
  TextareaControl,
  ToggleControl,
  SelectControl,
  ColorPalette,
  BaseControl,
  RangeControl,
} from '@wordpress/components';
import {MediaUpload, MediaUploadCheck, RichText} from '@wordpress/block-editor';
import {useState, useEffect} from '@wordpress/element';
import {ImagePreview} from "@scripts/editor/components/image-preview";
import {SortableList} from "@scripts/editor/components/sortable-list";

export default function BlockComponents({attributes, components, onChange, props, item = null, id = null}) {

  const [componentStates, setComponentStates] = useState({});

  // component condition
  useEffect(() => {
    const initialStates = {};
    components.forEach(component => {
      initialStates[component.name] = item ? item[component.name] : attributes[component.name];
    });
    setComponentStates(initialStates);
  }, [components, item, attributes]);

  const handleChange = (id, name, value) => {
    setComponentStates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    onChange(id, name, value);
  };

  const shouldRenderComponent = (component) => {
    if (component.condition) {
      const condition = Array.isArray(component.condition) ? component.condition : [component.condition];
      return condition.every(con =>
        componentStates[con.name] === con.value
      );
    }
    return true;
  };

  const renderBlockComponents = (component) => {
    switch (component.type) {
      case 'Text':
        return (
          <TextControl
            key={component.name}
            label={component.label}
            help={component.help}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
          />
        );
      case 'Textarea':
        return (
          <TextareaControl
            key={component.name}
            label={component.label}
            help={component.help}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
          />
        );
      case 'Toggle':
        return (
          <ToggleControl
            key={component.name}
            label={component.label}
            checked={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => handleChange(id, component.name, value)}
          />
        );
      case 'Select':
        return (
          <SelectControl
            key={component.name}
            label={component.label}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => handleChange(id, component.name, value)}
            options={[
              ...component.choices,
            ]}
          />
        );
      case 'ColorPalette':
        return (
          <BaseControl
            key={component.name}
            label={component.label}
          >
            <ColorPalette
              value={item ? item[component.name] : attributes[component.name]}
              onChange={(value) => onChange(id, component.name, value)}
              colors={[
                ...component.colors,
              ]}
              disableCustomColors={true}
              clearable={false}
            />
          </BaseControl>
        );
      case 'Image':
        return (
          <BaseControl
            key={component.name}
            label={component.label}
          >
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => onChange(id, component.name, media.id)}
                allowedTypes={['image']}
                value={item ? item[component.name] : attributes[component.name]}
                render={({open}) =>
                  <ImagePreview
                    open={open}
                    remove={() => onChange(id, component.name, 0)}
                    componentName={component.name}
                    mediaId={item ? item[component.name] : attributes[component.name]}
                  />
                }
              />
            </MediaUploadCheck>
          </BaseControl>
        );
      case 'Range':
        return (
          <RangeControl
            key={component.name}
            label={component.label}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
            min={component.min ?? 300}
            max={component.max ?? 1536}
            step={component.step ?? 10}
          />
        );
      case 'RichText':
        return (
          <RichText
            key={component.name}
            label={component.label}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
            placeholder={component.placeholder ?? '...'}
          />
        );
      case 'Repeater':
        return (
          <SortableList
            key={component.name}
            fields={component.fields}
            props={props}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {components.map((component) => {
        return shouldRenderComponent(component) ? renderBlockComponents(component) : null;
      })}
    </>
  )
}
