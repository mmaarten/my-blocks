import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';
import {
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PostControl,
} from './../../components';

class PostEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
    } = this.props;

    const { posts, template } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Post Settings', 'my-blocks' ) } initialOpen={ true }>
            <PostControl
              label={ __( 'Post' ) }
              value={ posts }
              onChange={ ( value ) => {
                console.log( 'onChange', value );
                setAttributes( { posts: value } );
              } }
            />
          </PanelBody>
        </InspectorControls>
        <p>Edit</p>
      </div>
    );
  }
}

export default PostEdit;
