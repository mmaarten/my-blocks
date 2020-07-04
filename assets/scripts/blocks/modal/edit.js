import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  TextControl,
  SelectControl,
  ToggleControl
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
  RichText,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import {
  getDialogClasses
} from './common';

class ModalEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className
    } = this.props;

    const { id, title, size, verticallyCentered } = attributes;

    const classes = classnames( {
      [ className ]: className,
  	} );

    const dialogClasses = getDialogClasses( attributes );

    return (
      <div className={ classes }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
            <TextControl
              label={ __( 'ID', 'my-blocks' ) }
              value={ id }
              onChange={ ( id ) => setAttributes( { id } ) }
            />
            <SelectControl
              label={ __( 'Size', 'my-blocks' ) }
              value={ size }
              onChange={ ( size ) => setAttributes( { size } ) }
              options={ [
                { label: __( 'Small', 'my-blocks' ), value: 'sm' },
                { label: __( 'Normal', 'my-blocks' ), value: '' },
                { label: __( 'Large', 'my-blocks' ), value: 'lg' },
              ] }
            />
            <ToggleControl
              label={ __( 'Vertically Centered', 'my-blocks' ) }
              checked={ verticallyCentered }
              onChange={ ( verticallyCentered ) => setAttributes( { verticallyCentered } ) }
            />
          </PanelBody>
        </InspectorControls>
          <div className="modal modal-fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div className={ dialogClasses } role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <RichText
                      placeholder={ __( 'Add text…', 'my-blocks' ) }
                      value={ title }
                      onChange={ ( title ) => setAttributes( { title } ) }
                      withoutInteractiveFormatting
                    />
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label={ __('Close', 'my-theme') }>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <InnerBlocks/>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default ModalEdit;
