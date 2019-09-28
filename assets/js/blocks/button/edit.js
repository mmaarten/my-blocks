import {
  __,
} from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
  Toolbar,
} from '@wordpress/components';
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
} from '@wordpress/block-editor';
import
  classnames
  from 'classnames';
import {
	URLControl,
} from './../../components';
import {
  themeColorOptions,
} from './../../config';

const REL_TAB = 'noreferrer noopener';

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
      update.rel = '';
    }
    setAttributes( update );
  };

  return (
    <div className={ className } style={ { textAlign : align } }>
      <InspectorControls>
        <PanelBody title={ __( 'Type Settings', 'my-blocks' ) } initialOpen={ false }>
          <SelectControl
            label={ __( 'Type', 'my-blocks' ) }
            value={ type }
            onChange={ ( type ) => setAttributes( { type } ) }
            options={ themeColorOptions }
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

export default ButtonEdit;
