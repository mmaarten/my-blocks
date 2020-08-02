import {
  __,
} from '@wordpress/i18n';
import {
  registerBlockType,
} from '@wordpress/blocks';
import {
  getColorClassName,
} from '@wordpress/block-editor';
import {
  getColumnClasses,
} from './common';
import {
    merge,
} from 'lodash';
getColorClassName
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
    backgroundColor : {
      type: 'string'
    },
    textColor : {
      type: 'string'
    },
    customTextColor : {
      type : 'string',
    },
    customBackgroundColor : {
      type : 'string',
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

        const {
          attributes,
        } = props;

        const {
          width,
          offset,
          order,
          customTextColor,
          customBackgroundColor,
          backgroundColor,
          textColor,
        } = attributes;

        let wrapperProps = props.wrapperProps ? props.wrapperProps : {};

        // Get classes
        const vendorClasses = getColumnClasses( props.attributes );
        // Add prefixes
        let classes = {};
        map( vendorClasses, ( use, className ) => {
          classes[ `has-${ className }` ] = use;
        } );

        const textColorClass = getColorClassName( 'text-color', textColor );
        const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );

        classes = merge( classes, {
            [textColorClass] : textColorClass,
            [backgroundColorClass] : backgroundColorClass,
        } )

        wrapperProps.style = {
    			backgroundColor: customBackgroundColor,
    			color: customTextColor,
    		};

        return (
            <BlockListBlock { ...props } className={ classnames( classes ) } wrapperProps={ wrapperProps } />
        );
    };
}, 'withColumnClasses' );

addFilter( 'editor.BlockListBlock', 'my-blocks/add-column-classes', addColumnClasses );
