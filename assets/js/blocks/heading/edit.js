import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
  Toolbar,
  ColorPalette,
  FontSizePicker,
} from '@wordpress/components';
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
  withColors,
	withFontSizes,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

class HeadingEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
      colors,
      textColor,
	    setTextColor,
      fontSizes,
      fontSize,
      setFontSize,
      mergeBlocks,
	    onReplace,
    } = this.props;

    const {
      content,
      level,
      textAlign,
    } = attributes;

    const tagName = `h${ level }`;

    const headingClasses = classnames( {
      [ className ] : className,
      [ `has-text-align-${ textAlign }` ] : textAlign,
      'has-text-color': textColor.color,
			[ textColor.class ]: textColor.class,
      [ fontSize.class ]: fontSize.class,
    } );

    const headingStyles = {
			color: textColor.color,
      fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
		};

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Heading Settings', 'my-blocks' ) } initialOpen={ false }>
            <SelectControl
              label={ __('Level', 'my-blocks') }
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
          <PanelBody title={ __( 'Color Settings', 'my-blocks' ) } initialOpen={ false }>
            <ColorPalette
              label={ __( 'Text Color', 'my-blocks' ) }
              colors={ colors }
              value={ textColor.color }
              onChange={ setTextColor }
            />
          </PanelBody>
          <PanelBody title={ __( 'Text Settings', 'my-blocks' ) } initialOpen={ false }>
            <FontSizePicker
              label={ __('Font Size') }
              fontSizes={ fontSizes }
              value={ fontSize.size }
              onChange={ setFontSize }
            />
          </PanelBody>
        </InspectorControls>
        <BlockControls>
          <AlignmentToolbar
            value={ textAlign }
            onChange={ ( value ) => setAttributes( { textAlign: value } ) }
          />
        </BlockControls>
        <div className={ className }>
          <RichText
            tagName={ tagName }
    				placeholder={ __( 'Write heading…', 'my-blocks' ) }
    				value={ content }
    				onChange={ ( value ) => setAttributes( { content: value } ) }
            className={ headingClasses }
            style={ headingStyles }
            onMerge={ mergeBlocks }
    				onSplit={ ( value ) => {
    					if ( ! value ) {
    						return createBlock( 'core/paragraph' );
    					}

    					return createBlock( 'core/heading', {
    						...attributes,
    						content: value,
    					} );
    				} }
    				onReplace={ onReplace }
    				onRemove={ () => onReplace( [] ) }
    			/>
        </div>
      </>
    );
  }
}

export default compose( [
  withColors( { textColor: 'color' } ),
  withFontSizes( 'fontSize' ),
  withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
    const { colors, fontSizes } = getSettings();
		return {
			colors,
      fontSizes,
		};
	} ),
] )( HeadingEdit );
