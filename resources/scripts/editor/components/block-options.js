import {TextControl, ToggleControl, SelectControl, ColorPalette, BaseControl, Button} from '@wordpress/components';
import {MediaUpload, MediaUploadCheck} from '@wordpress/block-editor';

export default function BlockOptions({options, attributes, onChangeAttribute}) {
  const renderOptions = (option) => {
    switch (option.type) {
      case 'TextControl':
        return (
          <TextControl
            key={option.name}
            label={option.label}
            value={attributes[option.name]}
            onChange={(value) => {
              onChangeAttribute([option.name], value)
            }}
          />
        );
      case 'ToggleControl':
        return (
          <ToggleControl
            key={option.name}
            label={option.label}
            checked={attributes[option.name]}
            onChange={(value) => {
              onChangeAttribute([option.name], value)
            }}
          />
        );
      case 'SelectControl':
        return (
          <SelectControl
            key={option.name}
            label={option.label}
            value={attributes[option.name]}
            options={[
              ...option.choices,
            ]}
            onChange={(value) => {
              onChangeAttribute([option.name], value)
            }}
          />
        );
      case 'ColorPalette':
        return (
          <BaseControl key={option.name} label={option.label}>
            <ColorPalette
              value={attributes[option.name]}
              colors={[
                ...option.colors,
              ]}
              onChange={(value) => {
                onChangeAttribute([option.name], value)
              }}
              disableCustomColors={true}
              clearable={false}
            />
          </BaseControl>
        );
      case 'MediaUpload':
        return (
          <BaseControl key={option.name} label={option.label}>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  onChangeAttribute([option.name], media.id)
                  onChangeAttribute(`${option.name}_preview_url`, media.sizes.thumbnail.url)
                }
                }
                allowedTypes={['image']}
                value={attributes[option.name]}
                render={({open}) =>
                  <Button
                    onClick={open}
                    className={'image-button'}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '100%',
                      height: '120px',
                      overflow: 'hidden',
                      padding: '0',
                      backgroundColor: '#efefef',
                    }}
                  >
                    {
                      attributes[option.name + '_preview_url']
                        ?
                        <img
                          src={attributes[`${option.name}_preview_url`]}
                          alt=''
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        :
                        ('Upload Image')
                    }
                  </Button>
                }
              />
            </MediaUploadCheck>
          </BaseControl>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {options && options.map((option) => renderOptions(option))}
    </>
  )
}
