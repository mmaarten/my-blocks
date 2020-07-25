import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  CycleSelectControl,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { map } from 'lodash';
import {
  ImageControl
} from './../../components';

const TEMPLATE = [
  [ 'core/heading', { content: __('Title', 'my-blocks') } ],
  [ 'core/paragraph', { content: __('Some quick example text to build on the card title and make up the bulk of the card\'s content.', 'my-blocks') } ],
  [ 'my/button', { text: __('Go somewhere', 'my-blocks') } ],
];

class CardEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
      imageSizes,
    } = this.props;

    const { image, imageSize } = attributes;

    const sizeOptions = map( imageSizes, ( { name, slug } ) => ( {
			value: slug,
			name,
		} ) );

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
            <ImageControl
              label={ __( 'Image', 'my-blocks' ) }
              image={ image }
              onChange={ ( image ) => setAttributes( { image } ) }
              size={ imageSize }
            />
            { image && (
              <CycleSelectControl
                icon={ 'editor-expand' }
                label={ __( 'Size' ) }
                value={ imageSize || 'large' }
                onChangeValue={ ( imageSize ) => setAttributes( { imageSize } ) }
                options={ sizeOptions }
              />
            ) }
          </PanelBody>
        </InspectorControls>
        <div className="card">
          { image && (
            <img
             className="card-img-top"
             src={ image.url }
             alt={ image.alt }
             title={ image.title }
            />
          ) }
          <div className="card-body">
            <InnerBlocks
             template={ TEMPLATE }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default compose( [
	withSelect( ( select, props ) => {
		const { getSettings } = select( 'core/block-editor' );
		const { imageSizes } = getSettings();

		return {
			imageSizes,
		};
	} ),
] )( CardEdit );
