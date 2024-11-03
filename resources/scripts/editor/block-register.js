import {registerBlockType} from '@wordpress/blocks';
import {Fragment} from '@wordpress/element';
import BlockOptions from "@scripts/editor/components/block-options";
import BlockFields from "@scripts/editor/components/block-fields";

if ('undefined' !== typeof window.gutengoodBlocks) {
  window.gutengoodBlocks.forEach(block => {
    const name = block.name;
    registerBlockType(name, {
      title: block.title,
      icon: getIcon ( block.icon ),
      description: block.description,
      category: block.category,
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

function getIcon ( icon ) {
  console.log ( icon );
  if ( !icon.includes ( '"svg"' ) ) return icon;
  const json = JSON.parse ( icon );
  // if ( !icon.hasOwnProperty ( 'svg' ) ) return icon;
  console.log ( json );
  const { svg } = json;
  const paths = svg.paths
    ? svg.paths.map ( ( path ) => wp.element.createElement ( 'path', {
      fill: path[ '@attributes' ].fill,
      d: path[ '@attributes' ].d,
    } ) )
    : wp.element.createElement ( 'path', {
      fill: svg.path[ '@attributes' ].fill,
      d: svg.path[ '@attributes' ].d,
    } );

  return wp.element.createElement ( 'svg', {
    width: svg[ '@attributes' ].width,
    height: svg[ '@attributes' ].height,
    viewBox: svg[ '@attributes' ].viewBox,
  }, paths );
}

