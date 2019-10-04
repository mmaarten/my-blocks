import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Button, Icon } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { Image } from './../../components';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ImageControl extends Component {
  constructor() {
    super( ...arguments );

    this.handleSelect = this.handleSelect.bind( this );
    this.renderSelect = this.renderSelect.bind( this );
    this.renderPreview = this.renderPreview.bind( this );
  }

  handleSelect( media ) {
    const { onChange } = this.props;

    onChange( media.id );
  }

  renderSelect( { open } ) {
    return (
      <Button onClick={ open } isLink={ true }>{ __( 'Select Image' ) }</Button>
    );
  }

  renderPreview( { open } ) {
    const { image, onChange } = this.props;

    const sizes = image.media_details.sizes;

    let size = sizes.full;
    if ( 'undefined' !== typeof sizes.thumbnail ) {
      size = sizes.thumbnail;
    }

    const orientation = size.width < size.height ? 'portret' : 'landscape';

    return (
      <div className="my-image-control__preview">
        <div className={`my-image-control__image ${orientation}`}>
          <Image id={ image.id } size="thumbnail" />
        </div>
        <div className="my-image-control__actions">
          <Button
            className="my-image-control__action"
            title={ __( 'Edit' ) }
            onClick={ open }
          ><Icon icon="edit" /></Button>
          <Button
            className="my-image-control__action"
            title={ __( 'Clear' ) }
            onClick={ () => onChange( null ) }
          ><Icon icon="no" /></Button>
        </div>
      </div>
    );
  }

  render() {
    const { image, onChange } = this.props;

    return (
      <>
        { ! image && (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ this.handleSelect }
              allowedTypes={ ALLOWED_MEDIA_TYPES }
              multiple={ false }
              render={ this.renderSelect }
            />
          </MediaUploadCheck>
        ) }
        { image && (
          <MediaUploadCheck>
            <MediaUpload
              value={ image.id }
              onSelect={ this.handleSelect }
              allowedTypes={ ALLOWED_MEDIA_TYPES }
              multiple={ false }
              render={ this.renderPreview }
            />
          </MediaUploadCheck>
        ) }
      </>
    );
  }
}

export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const { value } = ownProps;

	return {
		image: value ? getMedia( value ) : null,
	};
} )( ImageControl );
