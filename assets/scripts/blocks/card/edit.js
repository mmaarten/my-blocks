import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  TextControl,
  SelectControl,
  ToggleControl
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
  RichText,
} from '@wordpress/block-editor';
import classnames from 'classnames';
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
      className
    } = this.props;

    const { image } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
            <ImageControl
              label={ __( 'Image', 'my-blocks' ) }
              image={ image }
              onChange={ ( image ) => setAttributes( { image } ) }
              size="large"
            />
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

export default CardEdit;
