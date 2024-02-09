import {Fragment} from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import {useEffect, useState} from "react";
import {InspectorControls, RichText} from '@wordpress/block-editor';
import {PanelBody, Spinner} from '@wordpress/components';
import BlockOptions from "@scripts/editor/components/block-options";

/* Block name */
export const name = 'gutengood/example'

/* Block title */
export const title = 'Example'

/* Block category */
export const category = 'common'

/* Block edit */
export const edit = (props) => {

    const {
        attributes,
        setAttributes,
    } = props;

    const [data, setData] = useState(null);

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

if (!data) {
    return <Spinner/>;
}

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title='Options'>
          {data &&
                <BlockOptions
                options={data.options}
                attributes={attributes}
                onChangeAttribute={onChangeAttribute}
                />}
        </PanelBody>
      </InspectorControls>
      <RichText
        allowedFormats={['']}
        placeholder='Title...'
        tagName='h2'
        className={'container mb-6'}
        onChange={(value) => {
            setAttributes({title: value})
            }}
        value={attributes.title}
        disableLineBreaks
      />
      <RichText
        allowedFormats={['']}
        placeholder='Text...'
        tagName='div'
        className={'container'}
        onChange={(value) => {
            setAttributes({text: value})
            }}
        value={attributes.text}
        disableLineBreaks
      />
      <ServerSideRender
        block={name}
        attributes={attributes}
      />
    </Fragment>
  )
}

/* Block save */
export const save = () => null
