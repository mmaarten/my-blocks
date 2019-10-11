import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { get, assign } from 'lodash';
import classnames from 'classnames';
import { gridColumns } from './common';
import BreakpointNavigation from './breakpoint-navigation';

class ColumnEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const { attributes, setAttributes, className, hasChildBlocks } = this.props;
    const { width, offset, order } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Column Settings' ) } initialOpen={ true }>
            <BreakpointNavigation
              content={ ( breakpoint ) => (
                <>
                  <RangeControl
                    label={ __( 'Width' ) }
                    value={ get( width, breakpoint, '' ) }
                    onChange={ ( value ) => {
                      const update = { [ breakpoint ]: value };
                      setAttributes( { width: assign( {}, width, update ) } );
                    } }
                    min={ 1 }
                    max={ gridColumns }
                  />
                  <RangeControl
                    label={ __( 'Offset' ) }
                    value={ get( offset, breakpoint, '' ) }
                    onChange={ ( value ) => {
                      const update = { [ breakpoint ]: value };
                      setAttributes( { offset: assign( {}, offset, update ) } );
                    } }
                    min={ 1 }
                    max={ gridColumns }
                  />
                  <RangeControl
                    label={ __( 'Order' ) }
                    value={ get( order, breakpoint, '' ) }
                    onChange={ ( value ) => {
                      const update = { [ breakpoint ]: value };
                      setAttributes( { order: assign( {}, order, update ) } );
                    } }
                    min={ 1 }
                    max={ gridColumns }
                  />
                </>
              ) }
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          templateLock={ false }
          renderAppender={ (
            // Show appender when no inner blocks.
            hasChildBlocks ? undefined : () => <InnerBlocks.ButtonBlockAppender />
          ) }
        />
      </div>
    );
  }
}

export default compose(
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } = select( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
)( ColumnEdit );
