import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, Button, Icon } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { get, pick } from 'lodash';

class ImageControl extends Component {
  constructor() {
    super( ...arguments );

    this.onSelect = this.onSelect.bind( this );
    this.onRemove = this.onRemove.bind( this );

    this.state = {
      media : undefined
    };
  }

  onSelect( media ) {

    const { onChange, size } = this.props;

    if ( ! media || ! media.url ) {
      onchange( undefined );
      return;
    }

    let image = pick( media, [ 'id', 'alt', 'caption', 'link', 'title' ] );

    image.url = size && get( media, [ 'sizes', size, 'url' ] ) || get( media, [ 'sizes', 'full', 'url' ] );
    image.thumbURL = get( media, [ 'sizes', 'thumbnail', 'url' ] ) || get( media, [ 'sizes', 'full', 'url' ] );

    onChange( image );
  }

  onRemove() {
    const { onChange } = this.props;

    onChange( undefined );
  }

  render() {
    const { image } = this.props;
    return (
      <BaseControl label={ __( 'Image', 'my-blocks' ) }>
      { image && (
        <div class="my-blocks-image-control-image">
          <div class="my-blocks-image__preview">
            <img src={ image.thumbURL } />
            <div class="my-blocks-image__actions">
              <MediaUploadCheck>
                <MediaUpload
          			onSelect = { this.onSelect }
          			allowedTypes = { [ 'image' ] }
          			multiple = { false }
                value = { image.id }
                render={ ( { open } ) => (
                  <Button onClick={ open } title={ __('Edit image', 'my-blocks') }>
                    <Icon icon="edit" />
        					</Button>

                ) }
          		  />
              </MediaUploadCheck>
              <Button onClick={ this.onRemove } title={ __('Remove image', 'my-blocks') }>
                <Icon icon="trash" />
              </Button>
            </div>
          </div>
        </div>
      ) }
      { ! image && (
        <div>
          <MediaUploadCheck>
            <MediaUpload
      			 onSelect = { this.onSelect }
      			 allowedTypes = { [ 'image' ] }
      			 multiple = { false }
             render={ ( { open } ) => (
              <Button
               isSecondary
               isSmall
               onClick={ open }
              >
    					     { __('Select image', 'my-blocks') }
    					</Button>
            ) }
      		  />
          </MediaUploadCheck>
        </div>
      ) }
      </BaseControl>
    )
  }
}

export default ImageControl;
