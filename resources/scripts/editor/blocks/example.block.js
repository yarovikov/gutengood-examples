import {Fragment} from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import {useEffect, useState} from "react";
import {InspectorControls} from '@wordpress/block-editor';
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

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title='Options'>
          {!data && <Spinner/>}
          {data &&
          <BlockOptions
            options={data.options}
            attributes={attributes}
            onChangeAttribute={onChangeAttribute}
          />}
        </PanelBody>
      </InspectorControls>
      <ServerSideRender
        block={name}
        attributes={attributes}
      />
    </Fragment>
  )
}

/* Block save */
export const save = () => null
