import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { getColumnClasses } from './common';

import edit from './edit';
import save from './save';

registerBlockType('my/column', {
  apiVersion: 2,
  title: __( 'Column', 'my-blocks' ),
  description: __( 'Displays a column.', 'my-blocks' ),
	category: 'common',
	parent: [ 'my/row' ],
  supports: {
		anchor: true,
		reusable: false,
		html: false,
	},
  attributes: {
    width: {
      type: 'object',
      default: {},
    },
    offset: {
      type: 'object',
      default: {},
    },
    order: {
      type: 'object',
      default: {},
    },
  },
	edit,
	save,
});

import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

const withColumnClasses = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        if( props.name === 'my/column' ) {
            const classes = getColumnClasses( props.attributes );
            return <BlockListBlock { ...props } className={ classes } />;
        } else {
            return <BlockListBlock {...props} />
        }
    };
}, 'withClientIdClassName' );

addFilter( 'editor.BlockListBlock', 'my-blocks/with-column-classes', withColumnClasses );
