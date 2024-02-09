import {TextControl, ToggleControl, SelectControl} from '@wordpress/components';

export default function BlockOptions({options, attributes, onChangeAttribute})
{
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
