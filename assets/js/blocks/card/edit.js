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
  ImageControl
} from './../../components';

class CardEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const { attributes, setAttributes, className } = this.props;
    const { image } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Image Settings', 'my-blocks' ) } initialOpen={ true }>
            <ImageControl
              value={ image }
              onChange={ ( value ) => setAttributes( { image: value } ) }
            />
          </PanelBody>
        </InspectorControls>
        <p>Edit</p>
      </div>
    );
  }
}

export default CardEdit;
