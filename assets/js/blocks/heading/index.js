
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
    return class WrappedComponent extends Component {
      constructor() {
        super( ...arguments );
      }
      render() {
        return (
            <>
              <BlockEdit { ...this.props } />
              <InspectorControls>
                  <PanelBody>
                      My custom control
                  </PanelBody>
              </InspectorControls>
            </>
        );
      }
    }
}, 'withInspectorControl' );

addFilter( 'editor.BlockEdit', 'my-plugin/with-inspector-controls', withInspectorControls );
