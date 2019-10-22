import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, Button, Icon } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { get, isEmpty } from 'lodash';
import classnames from 'classnames';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const Image = ( { media, size } ) => {

  if ( ! media || 'image' !== media.media_type ) {
    return null;
  }

  const sizes = media.media_details.sizes;
  const full = get( sizes, 'full' );
  const data = get( sizes, size || 'thumbnail', full );

  const className = classnames( 'my-image-control__thumbnail', {
    'portrait': data.width <= data.height,
    'landscape': data.width > data.height,
  } );

  return (
    <div className={ className }>
      <img src={ data.source_url } />
    </div>
  );
}

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
            <Image media={ media } size="thumbnail" />
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ this.onSelect }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
                value={ media.id }
                render={ ( { open } ) => (
                  <div className="my-image-control__actions">
                    <Button onClick={ open } title={ __( 'Edit' ) }><Icon icon="edit" /></Button>
                    <Button onClick={ this.onRemove } title={ __( 'Clear' ) }><Icon icon="no-alt" /></Button>
                  </div>
                ) }
              />
            </MediaUploadCheck>
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
