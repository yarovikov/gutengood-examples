import {Spinner, PanelBody} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import {useState, useEffect} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import BlockComponents from "@scripts/editor/components/block-components";

export default function BlockOptions({name, props}) {

  const {attributes, setAttributes} = props;
  const [data, setData] = useState([]);

  const onChangeAttribute = (id = null, key, value) => {
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

  return (
    <InspectorControls>
      {!data && <Spinner/>}
      {data && data.options && data.options.length > 0 && (
        data.options.map((section, index) => {
          return (
            <PanelBody
              key={index}
              title={section.label ?? section.name}
              initialOpen={section.open ?? false}
            >
              <BlockComponents
                attributes={attributes}
                components={section.fields}
                onChange={onChangeAttribute}
                props={props}
              />
            </PanelBody>
          );
        })
      )}
    </InspectorControls>
  )
}
