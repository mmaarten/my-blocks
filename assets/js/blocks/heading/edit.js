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
  FontSizePicker,
  RichText,
  withFontSizes,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import
  classnames
  from 'classnames';
import {
  FontWeightControl,
  ColorControl,
} from './../../components';
import {
  colors,
} from './../../config';
import {
  map,
  filter,
  first,
  get,
  kebabCase,
} from 'lodash';

const HeadingEdit = ( { ...props } ) => {
  const {
    attributes,
    setAttributes,
    className,
		fontSize,
    fontSizes,
    setFontSize,
  } = props;

  const {
    content,
    level,
    align,
    fontWeight,
    color,
  } = attributes;

  const tagName = `h${level}`;

  return (
    <div className={ className }>
      <InspectorControls>
        <ColorControl
          color={ color }
          onChange={ ( value ) => setAttributes( { color: value } ) }
          slugs={
            [
              'primary',
              'secondary',
              'success',
              'info',
              'warning',
              'danger',
              'light',
              'dark',
              'muted',
              'white',
            ]
          }
        />
        <PanelBody title={ __('Heading Settings') }>
          <SelectControl
            label={ __( 'Level', 'my-blocks' ) }
            value={ level }
            onChange={ ( value ) => setAttributes( { level: value } ) }
            options={ [
              { label: __( 'Heading 1', 'my-blocks' ), value: 1 },
              { label: __( 'Heading 2', 'my-blocks' ), value: 2 },
              { label: __( 'Heading 3', 'my-blocks' ), value: 3 },
              { label: __( 'Heading 4', 'my-blocks' ), value: 4 },
              { label: __( 'Heading 5', 'my-blocks' ), value: 5 },
              { label: __( 'Heading 6', 'my-blocks' ), value: 6 },
            ] }
          />
        </PanelBody>
        <PanelBody title={ __('Font Size Settings') }>
          <FontSizePicker
            fontSizes={ fontSizes }
            fallbackFontSize={ 16 }
            value={ fontSize.size }
            onChange={ setFontSize }
          />
        </PanelBody>
        <PanelBody title={ __('Font Weight Settings') }>
          <FontWeightControl
            fontWeight={ fontWeight }
            onChange={ ( value ) => setAttributes( { fontWeight : value } ) }
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
        tagName={ tagName }
				placeholder={ __( 'Write heading…', 'my-blocks' ) }
				value={ content }
				onChange={ ( value ) => setAttributes( { content : value } ) }
        className={ classnames( {
          [ fontSize.class ]: fontSize.class,
          [ fontWeight.class ] : fontWeight.class,
          [ color.class ] : color.class,
        } ) }
			/>
    </div>
  );
};

export default compose(
  withFontSizes( 'fontSize' ),
)( HeadingEdit );
