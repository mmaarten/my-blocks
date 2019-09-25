import {
  __,
} from '@wordpress/i18n';
import {
	PanelBody,
  BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
  Toolbar,
  ColorPalette,
} from '@wordpress/components';
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
  URLInput,
} from '@wordpress/block-editor';
import {
	getBlockType,
} from '@wordpress/blocks';
import {
	URLControl,
} from './../../components';
import {
	map,
} from 'lodash';
import
  classnames
  from 'classnames';


const REL_TAB = 'noreferrer noopener';

const getColorObject = ( color, colors ) => {
  let _return = null;

  map( colors, ( obj ) => {
    if ( color === obj.color ) {
      _return = obj;
    }
  } );

  return _return;
};

const getColorBySlug = ( slug, colors ) => {
  let color = null;

  map( colors, ( obj ) => {
    if ( slug === obj.slug ) {
      color = obj.color;
    }
  } );

  return color;
};

const ButtonEdit = ( { ...props } ) => {
  const {
    attributes,
    setAttributes,
    className,
    name,
    isSelected,
  } = props;

  const {
    text,
    link,
    linkTab,
    type,
    size,
    outline,
    toggle,
    rel,
    align,
  } = attributes;

  const blockType = getBlockType( name );
  const defaultType = blockType.attributes.type.default;

  const handleLinkTabChange = ( isChecked ) => {
    let update = {
      linkTab : isChecked,
    };

    if ( isChecked ) {
      if (! rel) update.rel = REL_TAB;
    } else if ( REL_TAB === rel ) {
      update.rel = '';
    }
    setAttributes( update );
  };

  const handleColorChange = ( color ) => {

  };

  const setColor = ( slug ) => {

  };

  return (
    <div className={ className }>
      <InspectorControls>
        <PanelBody title={ __( 'Color Settings', 'my-blocks' ) } initialOpen={ false }>
          <BaseControl label={ __('Color', 'elixir') }>
            <ColorPalette
              colors={ myBlocks.themeColors }
              value={ getColorBySlug( type, myBlocks.themeColors ) }
              onChange={ ( color ) => {
                const colorObject = getColorObject( color, myBlocks.themeColors );
                setAttributes( { type : colorObject ? colorObject.slug : defaultType } )
              } }
              disableCustomColors={ true }
              clearable={ false }
            />
          </BaseControl>
          <ToggleControl
            label={ __( 'Outline', 'my-blocks' ) }
            checked={ outline }
            onChange={ ( outline ) => setAttributes( { outline } ) }
          />
        </PanelBody>
        <PanelBody title={ __( 'Size Settings', 'my-blocks' ) } initialOpen={ false }>
          <SelectControl
            label={ __( 'Size', 'my-blocks' ) }
            value={ size }
            onChange={ ( size ) => setAttributes( { size } ) }
            options={ [
              { label: __( 'Small', 'elixir' ), value: 'sm' },
              { label: __( 'Normal', 'elixir' ), value: '' },
              { label: __( 'Large', 'elixir' ), value: 'lg' },
            ] }
          />
        </PanelBody>
        <PanelBody title={ __( 'Link Settings', 'my-blocks' ) } initialOpen={ false }>
          <ToggleControl
            label={ __( 'Open in new tab', 'my-blocks' ) }
            checked={ linkTab }
            onChange={ handleLinkTabChange }
          />
          <TextControl
            label={ __( 'Link rel', 'my-blocks' ) }
            value={ rel }
            onChange={ ( rel ) => setAttributes( { rel } ) }
          />
          <SelectControl
            label={ __( 'Toggle', 'my-blocks' ) }
            value={ toggle }
            onChange={ ( toggle ) => setAttributes( { toggle } ) }
            options={ [
              { label: __( '- None -', 'elixir' ), value: null },
              { label: __( 'Modal', 'elixir' ), value: 'modal' },
              { label: __( 'Collapse', 'elixir' ), value: 'collapse' },
            ] }
          />
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <AlignmentToolbar
          value={ align }
          onChange={ ( align ) => setAttributes( { align } ) }
        />
      </BlockControls>
      <div className="my-blocks-block-preview">
        <div className={ classnames( { [`text-${align}`] : align } ) }>
          <div className={ className } style={ { textAlign : align } }>
            <RichText
      				placeholder={ __( 'Add text…', 'my-blocks' ) }
      				value={ text }
      				onChange={ ( text ) => setAttributes( { text } ) }
      				withoutInteractiveFormatting
      				className={ classnames(
      					'btn', {
      						[`btn-${ type }`]: type && ! outline,
      						[`btn-outline-${ type }`]: type && outline,
      						[`btn-${ size }`]: size,
      					}
      				) }
      				/>
            </div>
        </div>
      </div>
      { isSelected && (
        <URLControl
					label={ __( 'Link', 'my-blocks' ) }
          value={ link }
          onChange={ ( link ) => setAttributes( { link } ) }
          disableSuggestions={ ! isSelected }
        />
      ) }
    </div>
  );
};

export default ButtonEdit;
