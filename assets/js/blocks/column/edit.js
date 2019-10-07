import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
  RangeControl,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
} from '@wordpress/block-editor';

class ColumnEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
    } = this.props;

    const {
      width,
    } = attributes;

    return (
      <>
        <InspectorControls>
          <PanelBody>
            <RangeControl
              label={ __( 'Width' ) }
              value={ width }
              onChange={ ( value ) => setAttributes( { width : value } ) }
              min={ 1 }
              max={ 12 }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ className }>
          <InnerBlocks.Content />
        </div>
      </>
    );
  }
}

export default ColumnEdit;
