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

    const { post, posts, template } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Posts Settings', 'my-blocks' ) } initialOpen={ true }>
            <PostControl
              label={ __( 'Posts' ) }
              value={ posts }
              onChange={ ( value ) => {
                setAttributes( { posts: value } );
                console.log( value );
              } }
              isMultiple={ true }
            />
          </PanelBody>
          <PanelBody title={ __( 'Post Settings', 'my-blocks' ) } initialOpen={ true }>
            <PostControl
              label={ __( 'Post' ) }
              value={ post }
              onChange={ ( value ) => {
                setAttributes( { post: value } );
                console.log( value );
              } }
              isMultiple={ false }
            />
          </PanelBody>
        </InspectorControls>
        <p>Edit</p>
      </div>
    );
  }
}

export default PostEdit;
