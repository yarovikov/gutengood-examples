import {
  TextControl,
  TextareaControl,
  ToggleControl,
  SelectControl,
  ColorPalette,
  BaseControl,
  Button,
  RangeControl,
} from '@wordpress/components';
import {MediaUpload, MediaUploadCheck, RichText} from '@wordpress/block-editor';
import {useSelect} from '@wordpress/data';

export default function BlockComponents({attributes, components, onChange, item = null, id = null}) {

  const ImagePreview = ({mediaId}) => {
    const media = useSelect((select) => select('core').getMedia(mediaId), [mediaId]);
    const mediaUrl = media ? media.source_url : null;
    return (
      <>
        {
          mediaUrl
            ?
            <img src={mediaUrl} alt=''/>
            : 'Upload Image'
        }
      </>
    );
  };

  const renderBlockComponents = (component) => {
    switch (component.type) {
      case 'TextControl':
        return (
          <TextControl
            key={component.name}
            label={component.label}
            help={component.help}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
          />
        );
      case 'TextareaControl':
        return (
          <TextareaControl
            key={component.name}
            label={component.label}
            help={component.help}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
          />
        );
      case 'ToggleControl':
        return (
          <ToggleControl
            key={component.name}
            label={component.label}
            checked={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
          />
        );
      case 'SelectControl':
        return (
          <SelectControl
            key={component.name}
            label={component.label}
            value={item ? item[component.name] : attributes[component.name]}
            onChange={(value) => onChange(id, component.name, value)}
            components={[
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
      case 'MediaUpload':
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
                  <Button
                    onClick={open}
                    className={'image-button'}
                  >
                    <ImagePreview mediaId={item ? item[component.name] : attributes[component.name]}/>
                  </Button>
                }
              />
            </MediaUploadCheck>
          </BaseControl>
        );
      case 'RangeControl':
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
      default:
        return null;
    }
  };

  return (
    <>
      {components.map((component) => (renderBlockComponents(component)))}
    </>
  )
}
