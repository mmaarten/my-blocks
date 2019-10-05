import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls, getFontSizeClass } from '@wordpress/block-editor';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { assign } from 'lodash';
import classnames from 'classnames';

const BLOCK_NAME = 'core/heading';

addFilter( 'blocks.registerBlockType', 'my-blocks/heading-block-settings', ( settings, name ) => {
  if ( BLOCK_NAME !== name ) {
    return settings;
  }

  settings.attributes = assign( settings.attributes, {
    fontSize : {
      type : 'string',
    },
  } );

  return settings;
} );

const HeadingEdit = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
      if ( BLOCK_NAME !== props.name ) {
        return <BlockEdit { ...props } />
      }
      const { attributes, setAttributes } = props;
      const { fontSize } = attributes;
      const fontSizeClassName = getFontSizeClass( fontSize );

      props.attributes.className = fontSizeClassName;

      return (
        <>
          <BlockEdit { ...props } />
          <InspectorControls>
            <PanelBody title={ __( 'Font Settings', 'my-blocks' ) } initialOpen={ false }>
              <SelectControl
                label={ __( 'Font Size' ) }
                value={ fontSize }
                onChange={ ( value ) => setAttributes( { fontSize : value } ) }
                options={ [
                  { label: __( '- Default -', 'my-blocks' ), value: null },
                  { label: __( 'Heading 1', 'my-blocks' ), value: 'h-1' },
                  { label: __( 'Heading 2', 'my-blocks' ), value: 'h-2' },
                  { label: __( 'Heading 3', 'my-blocks' ), value: 'h-3' },
                  { label: __( 'Heading 4', 'my-blocks' ), value: 'h-4' },
                  { label: __( 'Heading 5', 'my-blocks' ), value: 'h-5' },
                  { label: __( 'Heading 6', 'my-blocks' ), value: 'h-6' },
                  { label: __( 'Display 1', 'my-blocks' ), value: 'display-1' },
                  { label: __( 'Display 2', 'my-blocks' ), value: 'display-2' },
                  { label: __( 'Display 3', 'my-blocks' ), value: 'display-3' },
                  { label: __( 'Display 4', 'my-blocks' ), value: 'display-4' },
                ] }
              />
            </PanelBody>
          </InspectorControls>

        </>
      );
    };
}, 'HeadingEdit' );

addFilter( 'editor.BlockEdit', 'my-blocks/heading-block-edit', HeadingEdit );

addFilter( 'blocks.getSaveContent.extraProps', 'my-blocks/heading-block-save', ( props, blockType, attributes ) => {
  if ( BLOCK_NAME !== props.name ) {
    return props;
  }

  const { className } = props;
  const { fontSize } = attributes;
  const fontSizeClassName = getFontSizeClass( fontSize );

  assign( props, {
    className: classnames( {
      [ className ]: className,
      [ fontSizeClassName ] : fontSizeClassName,
    } ),
  } );

  return props;
} );
