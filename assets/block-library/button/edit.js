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
} from '@wordpress/block-editor';
import {
	getBlockType,
} from '@wordpress/blocks';
import {
	URLControl,
} from './../../components';
import {
	first,
  filter,
} from 'lodash';
import
  classnames
  from 'classnames';

const REL_TAB = 'noreferrer noopener';
const DEFAULT_BUTTON_TYPE = 'primary';

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

  const handleLinkTabChange = ( isChecked ) => {
    let update = {
      linkTab : isChecked,
    };

    if ( isChecked ) {
      if (! rel) update.rel = REL_TAB;
    } else if ( REL_TAB === rel ) {
      update.rel = null;
    }
    setAttributes( update );
  };

  const colors = myBlocks.themeColors;

  // Find color with slug equal to `type`.
  const _colors = filter( colors, data => type === data.slug );
  const color = _colors.length ? first( _colors ).color : null;

  return (
    <div className={ className }>
      <InspectorControls>
        <PanelBody title={ __( 'Color Settings', 'my-blocks' ) } initialOpen={ false }>
          <BaseControl label={ __('Color', 'elixir') }>
            <ColorPalette
              colors={ colors }
              value={ color }
              onChange={ ( color ) => {
                // Find color slug
                const _colors = filter( colors, data => color === data.color );
                const _slug = _colors.length ? first( _colors ).slug : DEFAULT_BUTTON_TYPE;
                // Update type
                setAttributes( { type : _slug } );
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
              { label: __( 'Normal', 'elixir' ), value: null },
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
      <div className={ `${className}__preview` } style={ { textAlign : align } } >
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
      { isSelected && (
        <URLControl
          className={ `${className}__inline-link` }
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
