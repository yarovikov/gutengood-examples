import {Fragment} from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import {InspectorControls} from '@wordpress/block-editor';
import BlockOptions from "@scripts/editor/components/block-options";

export const name = 'gutengood/example'
export const title = 'Example'
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
            <ServerSideRender
                block={name}
                attributes={attributes}
            />
        </Fragment>
    )
}

export const save = () => null
