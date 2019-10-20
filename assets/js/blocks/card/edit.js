import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'my/button' ];
const TEMPLATE = [
    [ 'core/heading', {
      level: 5,
      className: 'card-title',
      content: __( 'Card title' ),
    } ],
    [ 'core/paragraph', {
      content: __( "Some quick example text to build on the card title and make up the bulk of the card's content." ),
    } ],
    [ 'my/button', {
      text: __( 'Go somewhere' ),
    } ],
];

class CardEdit extends Component {
  constructor() {
    super( ...arguments );
  }


  render() {
    const {
      attributes,
      setAttributes,
      className,
      colors,
    } = this.props;

    return (
      <div className={ className }>
        <div className="card">
          <img src="https://via.placeholder.com/800x600" className="card-img-top" />
          <div className="card-body">
            <InnerBlocks
              allowedBlocks={ ALLOWED_BLOCKS }
              template={ TEMPLATE }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CardEdit;
