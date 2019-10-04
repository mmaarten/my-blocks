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
} from '@wordpress/block-editor';
import {
  ImageControl,
  ImageSizeControl,
  Image,
} from './../../components';

class CardEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const { attributes, setAttributes, className } = this.props;
    const { image, imageSize } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Image Settings', 'my-blocks' ) } initialOpen={ true }>
            <ImageControl
              label={ __( 'Image' ) }
              value={ image }
              onChange={ ( value ) => setAttributes( { image: value } ) }
            />
            <ImageSizeControl
              label={ __( 'Image Size' ) }
              value={ imageSize }
              onChange={ ( value ) => setAttributes( { imageSize: value } ) }
            />
          </PanelBody>
        </InspectorControls>
        <div className="card">
          <Image id={ image } size={ imageSize } className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CardEdit;
