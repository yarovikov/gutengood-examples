import {Fragment} from '@wordpress/element';
import {InspectorControls, InnerBlocks} from '@wordpress/block-editor';
import BlockOptions from "@scripts/editor/components/block-options";

export const name = 'gutengood/container'
export const title = 'Container'
export const category = 'common'

export const edit = (props) => {

  const {
    attributes,
  } = props;

  return (
    <Fragment>
      <InspectorControls>
        <BlockOptions name={name} props={props}/>
      </InspectorControls>
      <div style={{
        margin: 'auto',
        maxWidth: `${attributes.width}px`,
      }}>
        <InnerBlocks template={[['core/paragraph']]}/>
      </div>
    </Fragment>
  )
}

export const save = () => {
  return <InnerBlocks.Content/>
}
