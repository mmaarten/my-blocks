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
  InnerBlocks,
} from '@wordpress/block-editor';
import
  classnames
  from 'classnames';

class ContainerEdit extends Component {
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
      type,
    } = attributes;

    const classes = classnames( {
      [ className ]: className,
      [`has-${type}-container`]: type,
    } );

    return (
      <>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
            <SelectControl
              label={ __('Type', 'my-blocks') }
              value={ type }
              onChange={ ( type ) => setAttributes( { type } ) }
              options={ [
                { label: __( 'Fixed Width', 'my-blocks' ), value: 'fixed' },
                { label: __( 'Full Width', 'my-blocks' ), value: 'fluid' },
              ] }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ classes }>
          <InnerBlocks />
        </div>
      </>
    );
  }
}

export default ContainerEdit;
