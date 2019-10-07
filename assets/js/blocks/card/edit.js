import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  ImageControl,
  ImageSizeControl,
} from './../../components';

class CardEdit extends Component {
  constructor() {
    super( ...arguments );

    this.allowedBlocks = [ 'core/heading', 'core/paragraph', 'my/button' ];
    this.template = [
      [ 'core/heading', {
        content: __( 'Card title' ),
        level: 3,
        fontSize: 'h-5',
      } ],
      [ 'core/paragraph', {
        content: __( "Some quick example text to build on the card title and make up the bulk of the card's content." ),
      } ],
      [ 'my/button', {
        text: __( 'Go somewhere' ),
      } ]
    ];

    this.handleImageChange = this.handleImageChange.bind( this );
    this.handleImageSizeChange = this.handleImageSizeChange.bind( this );
  }

  handleImageChange( media ) {
    console.log( 'media', media );
    const { attributes, setAttributes } = this.props;
    const { imageSize } = attributes;
    const { id, alt, sizes } = media;

    let size = sizes.full;
    if ( imageSize && 'undefined' !== typeof sizes[ imageSize ] ) {
      size = sizes[ imageSize ];
    } else if ( 'undefined' !== typeof sizes.thumbnail ) {
      size = sizes.thumbnail;
    }

    const image = {
      id : id,
      alt : alt,
      url : size.url,
      width : size.width,
      height : size.height,
    };

    setAttributes( { image } );
  }

  handleImageSizeChange( value ) {
    const { attributes, setAttributes } = this.props;

    setAttributes( { imageSize: value } );
  }

  render() {
    const { attributes, setAttributes, className } = this.props;
    const { image, imageSize, post } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Image Settings', 'my-blocks' ) } initialOpen={ true }>
            <ImageControl
              label={ __( 'Image' ) }
              value={ image }
              onChange={ this.handleImageChange }
            />
            <ImageSizeControl
              label={ __( 'Image Size' ) }
              value={ imageSize }
              onChange={ this.handleImageSizeChange }
            />
          </PanelBody>
        </InspectorControls>
        <div className="card">
          { image && (
            <img
              className="card-img-top"
              src={ image.url }
              width={ image.width }
              height={ image.height }
            />
          ) }
          <div className="card-body">
            <InnerBlocks
              allowedBlocks={ this.allowedBlocks }
              template={ this.template }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CardEdit;
