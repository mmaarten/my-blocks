import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';
import {
  InspectorControls,
  BlockControls,
  RichText,
  withColors,
	FontSizePicker,
	withFontSizes,
  PanelColorSettings,
  AlignmentToolbar,
} from '@wordpress/block-editor';
import {
  compose
} from '@wordpress/compose';
import
  classnames
  from 'classnames';

class HeadingEdit extends Component {

  constructor() {
    super( ...arguments );
  }

  render() {
    const { attributes, setAttributes, className, fontSize, setFontSize, textColor, setTextColor } = this.props;
    const { content, level, textAlign } = attributes;

    const tagName = `h${level}`;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Heading Settings', 'my-blocks' ) } initialOpen={ true }>
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
          <PanelBody title={ __( 'Text Settings', 'my-blocks' ) } initialOpen={ false }>
            <FontSizePicker
							value={ fontSize.size }
							onChange={ setFontSize }
						/>
          </PanelBody>
          <PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					/>
        </InspectorControls>
        <BlockControls>
          <AlignmentToolbar
            value={ textAlign }
            onChange={ ( value ) => setAttributes( { textAlign: value } ) }
          />
        </BlockControls>
        <RichText
          tagName={ tagName }
          placeholder={ __( 'Write heading…', 'my-blocks' ) }
          value={ content }
          onChange={ ( value ) => setAttributes( { content: value } ) }
          className={ classnames( {
						'has-text-color': textColor.color,
						[ `has-text-align-${ textAlign }` ]: textAlign,
						[ textColor.class ]: textColor.class,
						[ fontSize.class ]: fontSize.class,
					} ) }
					style={ {
						color: textColor.color,
						fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
					} }
        />
      </div>
    );
  }
}

export default HeadingEdit = compose( [
	withColors( { textColor: 'color' } ),
	withFontSizes( 'fontSize' ),
] )( HeadingEdit );
