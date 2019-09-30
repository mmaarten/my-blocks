import {
  __,
} from '@wordpress/i18n';
import {
	PanelBody,
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
  getColorObjectByColorValue,
  getColorObjectByAttributeValues,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
  get,
} from 'lodash';
import
  classnames
  from 'classnames';
import {
	URLControl,
} from './../../components';

// import {
// 	URLControl,
// } from './../../components';

const REL_TAB = 'noreferrer noopener';

const ButtonEdit = ( { ...props } ) => {
  const {
    attributes,
    setAttributes,
    className,
    isSelected,
    colors,
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

  const { color } = getColorObjectByAttributeValues( colors, type );

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

  return (
    <div className={ className }>
      <InspectorControls>
        <PanelBody title={ __( 'Color Settings', 'my-blocks' ) } initialOpen={ false }>
          <ColorPalette
            colors={ colors }
            value={ color }
            onChange={ ( color ) => {
              const colorObject = getColorObjectByColorValue( colors, color );
              const slug = get( colorObject, 'slug', 'primary' );
              setAttributes( { type : slug } );
            } }
            disableCustomColors={ true }
            clearable={ false }
          />
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
              { label: __( 'Small', 'my-blocks' ), value: 'sm' },
              { label: __( 'Normal', 'my-blocks' ), value: null },
              { label: __( 'Large', 'my-blocks' ), value: 'lg' },
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
              { label: __( '- None -', 'my-blocks' ), value: null },
              { label: __( 'Modal', 'my-blocks' ), value: 'modal' },
              { label: __( 'Collapse', 'my-blocks' ), value: 'collapse' },
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
      <div style={ { textAlign : align } }>
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
          className="wp-block-my-button__inline-link"
					label={ __( 'Link', 'my-blocks' ) }
          value={ link }
          onChange={ ( link ) => setAttributes( { link } ) }
          disableSuggestions={ ! isSelected }
        />
      ) }
    </div>
  );
};

export default compose( [
	withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
    const { colors } = getSettings();
		return {
			colors : colors,
		};
	} ),
] )( ButtonEdit );
