import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { createHigherOrderComponent, compose, ifCondition } from '@wordpress/compose';
import { InspectorControls, withFontSizes, getFontSizeClass } from '@wordpress/block-editor';
import { PanelBody, FontSizePicker } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { assign } from 'lodash';
import classnames from 'classnames';

const BLOCK_TYPE = 'core/heading';

addFilter( 'blocks.registerBlockType', 'my-blocks/heading/settings', ( settings, name ) => {
  if ( BLOCK_TYPE === name ) {
      return settings;
  }

  assign( settings.attributes, {
    fontSize : {
      type: 'string',
    },
    customFontSize : {
      type: 'number',
    },
  } );

  return settings;
} );


// addFilter( 'blocks.getSaveElement', 'my-blocks/heading/save', ( element, blockType, attributes ) => {
//   if ( BLOCK_TYPE !== blockType.name ) {
//       return element;
//   }
//   const { fontSize, customFontSize } = attributes;
//
//   const fontSizeClass = getFontSizeClass( fontSize );
//
//   const classes = classnames( {
//     [ fontSizeClass ]: fontSizeClass,
//     'has-font-size': !! fontSizeClass || !! customFontSize,
//   } );
//
//   const styles = {
//     fontSize: fontSizeClass ? undefined : customFontSize,
//   };
//
//   return (
//     <div className={ classes } style={ styles }>
//       { element }
//     </div>
//   );
//
// } );

addFilter( 'editor.BlockEdit', 'my-blocks/heading/edit', ( BlockEdit ) => {
  return compose( [
    ifCondition( ( { name } ) => BLOCK_TYPE == name ),
    withFontSizes( 'fontSize' ),
    withSelect( ( select ) => {
  		const { getSettings } = select( 'core/block-editor' );
      const { fontSizes } = getSettings();
  		return {
  			fontSizes,
  		};
  	} ),
    () => {
      return class extends Component {
        constructor() {
          super( ...arguments );
        }
        render() {
          const { fontSizes, fontSize, setFontSize, className } = this.props;

          const classes = classnames( {
						[ fontSize.class ]: fontSize.class,
            'has-font-size': !! fontSize.class || !! fontSize.size,
					} );

          const styles = {
            fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
          };

          return (
            <>
              <div className={ classes } style={ styles }>
                <BlockEdit { ...this.props } />
              </div>
              <InspectorControls>
                <PanelBody title={ __( 'Text Settings' ) }>
      						<FontSizePicker
                    fontSizes={ fontSizes }
      							value={ fontSize.size }
      							onChange={ setFontSize }
      						/>
      					</PanelBody>
              </InspectorControls>
            </>
          );
        }
      }
    }
  ] )( BlockEdit );
} );
