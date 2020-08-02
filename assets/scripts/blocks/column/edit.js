import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  Toolbar,
  BaseControl,
  RangeControl,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
  withColors,
  PanelColorSettings,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { get, assign } from 'lodash';
import { gridColumns } from './common';
import { BreakpointNavigation } from './../../components';

class ColumnEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
        attributes,
        setAttributes,
        className,
        hasChildBlocks,
        backgroundColor,
        setBackgroundColor,
        textColor,
        setTextColor,
    } = this.props;

    const {
      width,
      offset,
      order,
      customTextColor,
      customBackgroundColor,
    } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
          <BreakpointNavigation
            onChange={ ( breakpoint ) => (
              <>
                <RangeControl
                  label={ __( 'Width' ) }
                  value={ get( width, breakpoint, '' ) }
                  onChange={ ( value ) => {
                    setAttributes( {
                      width: assign( {}, width, { [ breakpoint ]: value } )
                    } );
                  } }
                  min={ 1 }
                  max={ gridColumns }
                  allowReset
                />
                <RangeControl
                  label={ __( 'Offset' ) }
                  value={ get( offset, breakpoint, '' ) }
                  onChange={ ( value ) => {
                    setAttributes( {
                      offset: assign( {}, offset, { [ breakpoint ]: value } )
                    } );
                  } }
                  min={ 1 }
                  max={ gridColumns }
                  allowReset
                />
                <RangeControl
                  label={ __( 'Order' ) }
                  value={ get( order, breakpoint, '' ) }
                  onChange={ ( value ) => {
                    setAttributes( {
                      order: assign( {}, order, { [ breakpoint ]: value } )
                    } );
                  } }
                  min={ 1 }
                  max={ gridColumns }
                  allowReset
                />
              </>
            ) }
          />
          </PanelBody>
          <PanelColorSettings
            initialOpen={ false }
						title={ __('Color Settings', 'my-blocks') }
						colorSettings={[
							{
								label: __('Text Color'),
								onChange: setTextColor,
								value: textColor.color,
							},
              {
								label: __('Background Color'),
								onChange: setBackgroundColor,
								value: backgroundColor.color,
							}
						]}
					/>
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
  withColors( 'backgroundColor', 'textColor' ),
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder, getBlockIndex, getBlockRootClientId } = select( 'core/block-editor' );
    const rootClientId = getBlockRootClientId( clientId );

    return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
  withDispatch( ( dispatch, ownProps, registry ) => ( {
    updateColumns( previousColumns, newColumns ) {
      const { clientId } = ownProps;
		  const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		  const { getBlocks } = registry.select( 'core/block-editor' );

      let innerBlocks = getBlocks( clientId );

      if ( newColumns > previousColumns ) {
        innerBlocks = [
  				...innerBlocks,
  				...times( newColumns - previousColumns, () => {
  					return createBlock( 'my/column' );
  				} ),
        ];
      } else {
        // The removed column will be the last of the inner blocks.
			  innerBlocks = dropRight( innerBlocks, previousColumns - newColumns );
      }

      replaceInnerBlocks( clientId, innerBlocks, false );
    },
  } ) )
)( ColumnEdit );
