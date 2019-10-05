import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, Button, Icon } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ImageControl extends Component {
  constructor() {
    super( ...arguments );

    this.handleSelect = this.handleSelect.bind( this );
    this.handleClear = this.handleClear.bind( this );
    this.renderSelect = this.renderSelect.bind( this );
    this.renderPreview = this.renderPreview.bind( this );
  }

  handleSelect( media ) {
    const { onChange } = this.props;
    onChange( media );
  }

  handleClear() {
    const { onChange } = this.props;
    onChange( null );
  }

  renderSelect( { open } ) {
    return (
      <div className="my-image-control__select">
        <Button onClick={ open } isLink={ true }>{ __( 'Select Image' ) }</Button>
      </div>
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
          <img src={ size.source_url } />
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
            onClick={ this.handleClear }
          ><Icon icon="no" /></Button>
        </div>
      </div>
    );
  }

  render() {
    const {
      label,
      hideLabelFromVision,
      help,
      className,
      image,
    } = this.props;

    return (
      <BaseControl
        label={ label }
        hideLabelFromVision={ hideLabelFromVision }
        help={ help }
        className={ className }
      >
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
      </BaseControl>
    );
  }
}

export default withSelect( ( select, props ) => {
	const { getMedia } = select( 'core' );
  const { value } = props;

  let mediaId = null;
  if ( value ) {
    if ( 'object' === typeof value && 'undefined' !== typeof value.id ) {
      mediaId = value.id;
    } else {
      mediaId = value;
    }
  }

	return {
		image: mediaId ? getMedia( mediaId ) : null,
	};
} )( ImageControl );
