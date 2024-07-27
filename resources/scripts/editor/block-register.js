import {registerBlockType} from '@wordpress/blocks';
import {Fragment} from '@wordpress/element';
import BlockOptions from "@scripts/editor/components/block-options";
import BlockFields from "@scripts/editor/components/block-fields";

if ('undefined' !== typeof gutengoodBlocks) {
  gutengoodBlocks.forEach(block => {
    const name = `gutengood/${block}`;
    registerBlockType(name, {
      title: block,
      icon: 'block-default',
      category: 'common',
      edit: (props) => {
        return (
          <Fragment>
            <BlockOptions name={name} props={props}/>
            <BlockFields name={name} props={props}/>
          </Fragment>
        )
      },
      save: () => null,
    });
  });
}
