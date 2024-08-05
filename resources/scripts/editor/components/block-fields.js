import {Spinner, ToolbarButton, ToolbarGroup} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import {useState, useEffect} from '@wordpress/element';
import {RichText, BlockControls} from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {seen} from '@wordpress/icons';
import {SortableList} from "@scripts/editor/components/sortable-list";

export default function BlockFields({name, props}) {

  const {attributes, setAttributes} = props;
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const onChangeAttribute = (key, value) => {
    setAttributes({[key]: value})
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    apiFetch({path: `/${name}/v1/data`})
      .then((res) => {
        setData(res)
        res.fields.map((field) => {
          [field.name] in field && onChangeAttribute([field.name], field.value);
        });
      })
      .catch((error) => console.error(error?.message));
  }, []);

  const renderFields = (field) => {
    switch (field.type) {
      case 'RichText':
        return (
          <RichText
            key={field.name}
            placeholder='...'
            value={attributes[field.name]}
            onChange={(value) => {
              onChangeAttribute([field.name], value)
            }}
          />
        );
      case 'Repeater':
        return (
          <SortableList key={field.name} fields={field.fields} props={props}/>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!data && <Spinner/>}
      {data && data.fields && (
        <BlockControls>
          <ToolbarGroup>
            <ToolbarButton
              icon={!editMode ? 'edit' : seen}
              onClick={toggleEditMode}
            />
          </ToolbarGroup>
        </BlockControls>
      )}
      {data && data.fields && editMode && (
        <>
          {data.fields.map((field) => (renderFields(field)))}
        </>
      )}
      {!editMode && (
        <ServerSideRender
          httpMethod='POST'
          block={name}
          attributes={props.attributes}
        />
      )}
    </>
  )
}
