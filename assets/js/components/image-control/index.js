import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { get, isEmpty } from 'lodash';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ImageControl extends Component {
  constructor() {
    super( ...arguments );

    this.onSelect = this.onSelect.bind( this );
    this.onRemove = this.onRemove.bind( this );
  }

  onSelect( media ) {
    const sizes = media.sizes;
    const full  = get( media.sizes, 'full' );
    const thumb = get( media.sizes, 'thumbnail', full );

    const image = {
      id : media.id,
      link : media.link,
      fullURL : get( full, 'url' ),
      thumbURL : get( thumb, 'url' ),
      alt : media.alt,
    };

    this.props.onChange( image );
  }

  onRemove( media ) {
    this.props.onChange( null );
  }

  render() {
    const { value, onChange } = this.props;
    const image = value;

    return (
      <div className="my-image-control">
        { isEmpty( image ) && (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ this.onSelect }
              allowedTypes={ ALLOWED_MEDIA_TYPES }
              render={ ( { open } ) => (
                <Button onClick={ open } isLink={ true }>{ __( 'Select Image' ) }</Button>
              ) }
            />
          </MediaUploadCheck>
        ) }
        { ! isEmpty( image ) && (
          <div className="my-image-control__preview">
            <img src={ get( image, 'thumbURL' ) } />
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ this.onSelect }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                value={ image.id }
                render={ ( { open } ) => (
                  <div className="my-image-control__actions">
                    <Button onClick={ open } isLink={ true }>{ __( 'Edit Image' ) }</Button>
                    <Button onClick={ this.onRemove } isLink={ true }>{ __( 'Remove Image' ) }</Button>
                  </div>
                ) }
              />
            </MediaUploadCheck>
          </div>
        ) }
      </div>
    );
  }
}

export default ImageControl;
