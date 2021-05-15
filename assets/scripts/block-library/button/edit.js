import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl } from '@wordpress/components';
import { getButtonClasses } from './common';
import { URLControl } from '../../components';
import { getSetting, getSelectOptions } from '../../helpers';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const { text, link, linkTab, type, outline, size, block, toggle } = attributes;

  const blockProps = useBlockProps();
  const buttonClasses = getButtonClasses( attributes );

  return (
    <>
      <InspectorControls>
        <PanelBody title={ __( 'Link Settings', 'my-blocks' ) } initialOpen={ true }>
          <URLControl
            label={ __( 'Link', 'my-blocks' ) }
            value={ link }
            onChange={ ( link ) => setAttributes( { link } ) }
          />
          <ToggleControl
            label={ __( 'Open in new window', 'my-blocks' ) }
            checked={ linkTab }
            onChange={ ( linkTab ) => setAttributes( { linkTab } ) }
          />
        </PanelBody>
        <PanelBody title={ __( 'Style Settings', 'my-blocks' ) } initialOpen={ false }>
          <SelectControl
            label={ __( 'Type', 'my-blocks' ) }
            options={ getSelectOptions( getSetting( 'themeColors' ) ) }
            value={ type }
            onChange={ ( type ) => setAttributes( { type } ) }
          />
          <ToggleControl
            label={ __( 'Outline', 'my-blocks' ) }
            checked={ outline }
            onChange={ ( outline ) => setAttributes( { outline } ) }
          />
          <SelectControl
            label={ __( 'Size', 'my-blocks' ) }
            options={ [
							{ label: __( 'Small', 'my-blocks' ), value: 'sm' },
              { label: __( 'Medium', 'my-blocks' ), value: '' },
              { label: __( 'Large', 'my-blocks' ), value: 'lg' },
						] }
            value={ size }
            onChange={ ( size ) => setAttributes( { size } ) }
          />
          <ToggleControl
            label={ __( 'Full Width', 'my-blocks' ) }
            checked={ block }
            onChange={ ( block ) => setAttributes( { block } ) }
          />
        </PanelBody>
        <PanelBody title={ __( 'Toggle Settings', 'my-blocks' ) } initialOpen={ false }>
          <SelectControl
            label={ __( 'Toggle', 'my-blocks' ) }
            options={ [
              { label: __( '- Select -', 'my-blocks' ), value: '' },
							{ label: __( 'Modal', 'my-blocks' ), value: 'modal' },
              { label: __( 'Collapse', 'my-blocks' ), value: 'collapse' },
						] }
            value={ toggle }
            onChange={ ( toggle ) => setAttributes( { toggle } ) }
          />
        </PanelBody>
      </InspectorControls>
      <div { ...blockProps }>
        <RichText
          tagName="span"
          className={ buttonClasses }
          value={ text }
          onChange={ ( text ) => setAttributes( { text } ) }
          placeholder={ __( 'Button text...', 'my-blocks' ) }
          allowedFormats={ [] }
          withoutInteractiveFormatting
        />
      </div>
    </>
  );
};
