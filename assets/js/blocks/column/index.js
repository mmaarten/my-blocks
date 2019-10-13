import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';
import {
  getColumnClasses,
} from './common';

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
      type: 'object',
    },
    offset : {
      type: 'object',
    },
    order : {
      type: 'object',
    },
  },
	edit,
	save,
});

import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import classnames from 'classnames';
import { get, map } from 'lodash';

const addColumnClasses = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        // Return when not our block.
        if ( 'my/column' !== props.name ) {
          return <BlockListBlock { ...props } />
        }

        // Get classes
        const classes = classnames( getColumnClasses( props.attributes ) );

        return (
            <BlockListBlock { ...props } className={ classes } />
        );
    };
}, 'withColumnClasses' );

addFilter( 'editor.BlockListBlock', 'my-blocks/add-column-classes', addColumnClasses );
