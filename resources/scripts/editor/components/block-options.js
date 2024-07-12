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
import {MediaUpload, MediaUploadCheck} from '@wordpress/block-editor';
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
        fetch(`/wp-json/${name}/v1/data`)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData)
                jsonData.options.map((option) => {
                    [option.name] in option && onChangeAttribute([option.name], option.value);
                });
            })
            .catch((error) => console.error(error?.message));
    }, []);

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
                                    >
                                        {
                                            attributes[option.name + '_preview_url']
                                                ?
                                                <img src={attributes[`${option.name}_preview_url`]} alt=''/>
                                                :
                                                ('Upload Image')
                                        }
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
                <PanelBody title='Block Options'>
                    {data.options.map((option) => (renderOptions(option)))}
                </PanelBody>
            )}
        </>
    )
}
