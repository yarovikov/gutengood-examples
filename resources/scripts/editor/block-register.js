import {registerBlockType} from '@wordpress/blocks';
import {Fragment} from '@wordpress/element';
import BlockOptions from "@scripts/editor/components/block-options";
import BlockFields from "@scripts/editor/components/block-fields";

if ('undefined' !== typeof gutengoodBlocks) {
  gutengoodBlocks.forEach(block => {
    const name = block.name;
    registerBlockType(name, {
      title: block.title,
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
