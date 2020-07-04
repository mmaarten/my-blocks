import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  BaseControl,
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

class SampleEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className
    } = this.props;

    const {} = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
          </PanelBody>
        </InspectorControls>
      </div>
    );
  }
}

export default SampleEdit;
