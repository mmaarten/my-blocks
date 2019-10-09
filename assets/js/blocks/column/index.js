import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'my/column', {
	title: __( 'Column', 'my-blocks' ),
  description: __( 'Displays a column.', 'my-blocks' ),
	category: 'common',
	keywords: [ __( 'My Blocks', 'my-blocks' ) ],
  parent: [ 'my/row' ],
  supports: {
		inserter: false,
		reusable: false,
		html: false,
	},
  attributes: {
    width : {
      type: 'number',
      min: 1,
      max: 12,
    }
  },
	edit,
	save,
	// getEditWrapperProps( attributes ) {
	// 	const { width } = attributes;
	// 	if ( Number.isFinite( width ) ) {
	// 		return {
	// 			style: {
	// 				flexBasis: ( width / 12 * 100 ) + '%',
	// 			},
	// 		};
	// 	}
	// },
});

import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import classnames from 'classnames';

const withClientIdClassName = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        if ( 'my/column' !== props.name ) {
          return <BlockListBlock { ...props } />
        }

        const { attributes } = props;
        const { width } = attributes;

        const classes = classnames( {
          [ `col-md-${ width }` ] : width,
          'col-md' : width ? false : true,
        } );

        return (
          <div className={ classes }>
            <BlockListBlock { ...props } />
          </div>
        );
    };
}, 'withClientIdClassName' );

addFilter( 'editor.BlockListBlock', 'my-plugin/with-client-id-class-name', withClientIdClassName );
