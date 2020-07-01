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
    verticalAlignment: {
      type: 'string',
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
        const vendorClasses = getColumnClasses( props.attributes );

        // Add prefixes
        let classes = {};
        map( vendorClasses, ( use, className ) => {
          classes[ `has-${ className }` ] = use;
        } );


        return (
            <BlockListBlock { ...props } className={ classnames( classes ) } />
        );
    };
}, 'withColumnClasses' );

addFilter( 'editor.BlockListBlock', 'my-blocks/add-column-classes', addColumnClasses );
