import {
  TextControl,
  TextareaControl,
  ToggleControl,
  SelectControl,
  ColorPalette,
  BaseControl,
  Button,
  RangeControl,
  Spinner,
  PanelBody,
} from '@wordpress/components';
import {MediaUpload, MediaUploadCheck, InspectorControls} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import {useSelect} from '@wordpress/data';
import {useEffect, useState} from "react";

export default function BlockOptions({name, props}) {

  const {
    attributes,
    setAttributes,
  } = props;

  const [data, setData] = useState([]);

  const onChangeAttribute = (key, value) => {
    setAttributes({[key]: value})
  };

  useEffect(() => {
    apiFetch({path: `/${name}/v1/data`})
      .then((res) => {
        setData(res)
        res.options.map((option) => {
          [option.name] in option && onChangeAttribute([option.name], option.value);
        });
      })
      .catch((error) => console.error(error?.message));
  }, []);

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

  const renderOptions = (option) => {
    switch (option.type) {
      case 'TextControl':
        return (
          <TextControl
            key={option.name}
            label={option.label}
            help={option.help}
            value={attributes[option.name]}
            onChange={(value) => {
              onChangeAttribute([option.name], value)
            }}
          />
        );
      case 'TextareaControl':
        return (
          <TextareaControl
            key={option.name}
            label={option.label}
            help={option.help}
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
                }}
                allowedTypes={['image']}
                value={attributes[option.name]}
                render={({open}) =>
                  <Button
                    onClick={open}
                    className={'image-button'}
                  >
                    <ImagePreview mediaId={attributes[option.name]}/>
                  </Button>
                }
              />
            </MediaUploadCheck>
          </BaseControl>
        );
      case 'RangeControl':
        return (
          <RangeControl
            key={option.name}
            label={option.label}
            value={attributes[option.name]}
            onChange={(value) => {
              onChangeAttribute([option.name], value)
            }}
            min={option.min ?? 300}
            max={option.max ?? 1536}
            step={option.step ?? 10}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!data && <Spinner/>}
      {data && data.options && (
        <InspectorControls>
          <PanelBody title='Block Options'>
            {data.options.map((option) => (renderOptions(option)))}
          </PanelBody>
        </InspectorControls>
      )}
    </>
  )
}
