import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';
import {
  getColumnsClasses,
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
      default: {},
    },
    offset : {
      type: 'object',
      default: {},
    },
    order : {
      type: 'object',
      default: {},
    },
  },
	edit,
	save,
});

import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import classnames from 'classnames';
import { get, map } from 'lodash';

const withClientIdClassName = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
        if ( 'my/column' !== props.name ) {
          return <BlockListBlock { ...props } />
        }

        let classes = {};
        map( getColumnsClasses( props.attributes ), ( value, className ) => {
          classes[ `has-${ className }` ] = value;
        } );

        return (
            <BlockListBlock { ...props } className={ classnames( classes ) } />
        );
    };
}, 'withClientIdClassName' );

addFilter( 'editor.BlockListBlock', 'my-plugin/with-client-id-class-name', withClientIdClassName );
