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

  const ImagePreview = ({open, remove, mediaId}) => {
    const media = useSelect((select) => select('core').getMedia(mediaId), [mediaId]);
    const mediaUrl = media ? media.media_details.sizes.thumbnail.source_url : null;
    return (
      <>
        {mediaUrl
          ?
          (
            <div className='relative w-fit'>
              <img className='mb-2' src={mediaUrl} alt=''/>
              <div className='absolute top-2 right-2 flex items-center gap-2'>
                <Button
                  className='bg-white/80'
                  onClick={open}
                  icon={'edit'}
                >
                </Button>
                <Button
                  className='bg-white/80'
                  icon={'trash'}
                  onClick={remove}
                >
                </Button>
              </div>
            </div>
          )
          :
          <Button
            className='is-primary block'
            onClick={open}
          >
            Choose Image
          </Button>
        }
      </>
    );
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
            onChange={(value) => onChange(id, component.name, value)}
          />
        );
      case 'Select':
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
