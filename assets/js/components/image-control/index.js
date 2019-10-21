import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, Button, Icon } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
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
    this.props.onChange( media );
  }

  onRemove( media ) {
    this.props.onChange( null );
  }

  render() {
    const { media, label, hideLabelFromVision, help } = this.props;

    // Get image preview data.
    let image = null;
    if ( media && 'image' === media.media_type ) {
      const sizes = media.media_details.sizes;
      const full = get( sizes, 'full' );
      image = get( sizes, 'thumbnail', full );
    }

    return (
      <BaseControl
        label={ label }
        hideLabelFromVision={ hideLabelFromVision }
        help={ help }
        className="my-image-control"
      >
        { isEmpty( media ) && (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ this.onSelect }
              allowedTypes={ ALLOWED_MEDIA_TYPES }
              render={ ( { open } ) => (
                <p>
                  <Button onClick={ open } isLink={ true }>{ __( 'Select Image' ) }</Button>
                </p>
              ) }
            />
          </MediaUploadCheck>
        ) }
        { ! isEmpty( media ) && (
          <div className="my-image-control__preview">
            <div className="my-image-control__thumbnail">
              <img src={ image.source_url } />
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ this.onSelect }
                  allowedTypes={ ALLOWED_MEDIA_TYPES }
                  value={ media.id }
                  render={ ( { open } ) => (
                    <div className="my-image-control__actions">
                      <Button onClick={ open } isDefault title={ __( 'Edit' ) }>
                        <Icon icon="edit" />
                      </Button>
                      <Button onClick={ this.onRemove } isDefault title={ __( 'Clear' ) }>
                        <Icon icon="no-alt" />
                      </Button>
                    </div>
                  ) }
                />
              </MediaUploadCheck>
            </div>
          </div>
        ) }
      </BaseControl>
    );
  }
}

const applyWithSelect = withSelect( ( select, props ) => {
  const { value } = props;
	const { getMedia } = select( 'core' );
  const mediaID = get( value, 'id', value );

	return {
		media: mediaID ? getMedia( mediaID ) : null,
	};
} );

export default compose(
  applyWithSelect,
)( ImageControl );
