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
  BlockControls,
  BlockVerticalAlignmentToolbar
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { get, assign } from 'lodash';
import classnames from 'classnames';
import { gridColumns, defaultBreakpoint } from './common';
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
      blockIndex,
      moveBlockTo,
      removeBlock,
    } = this.props;

    const { width, offset, order, verticalAlignment } = attributes;

    const classes = classnames( {
      [ className ]: className,
			[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
  	} );

    return (
      <div className={ classes }>
        <InspectorControls>
          <PanelBody initialOpen={ true }>
            <RangeControl
              label={ __( 'Width' ) }
              value={ get( width, defaultBreakpoint, '' ) }
              onChange={ ( value ) => {
                setAttributes( {
                  width: assign( {}, width, { [ defaultBreakpoint ]: value } )
                } );
              } }
              min={ 1 }
              max={ gridColumns }
              allowReset
            />
          </PanelBody>
          <PanelBody title={ __( 'Responsiveness Settings' ) } initialOpen={ false }>
            <BreakpointNavigation
              onSelect={ ( breakpoint ) => (
                <>
                  { defaultBreakpoint === breakpoint && (
                    <BaseControl label={ __( 'Width' ) }>
                      <p>{ __( 'Value of width attribute.' ) }</p>
                    </BaseControl>
                  ) }
                  { defaultBreakpoint !== breakpoint && (
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
                  ) }
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
        </InspectorControls>
        <BlockControls>
  				<BlockVerticalAlignmentToolbar
  					value={ verticalAlignment }
            onChange={ ( value ) => { setAttributes( { verticalAlignment: value } ) } }
  				/>
          <Toolbar
            controls={ [
              {
          			icon: 'arrow-left-alt',
          			title: __( 'Move Left' ),
          			isActive: false,
          			onClick: () => { moveBlockTo( blockIndex - 1 ) },
          		},
              {
          			icon: 'arrow-right-alt',
          			title: __( 'Move Right' ),
          			isActive: false,
          			onClick: () => { moveBlockTo( blockIndex + 1 ) },
          		},
            ] }
          />
  			</BlockControls>
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
		const { getBlockOrder, getBlockIndex, getBlockRootClientId } = select( 'core/block-editor' );
    const rootClientId = getBlockRootClientId( clientId );

    return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
      blockIndex: getBlockIndex( clientId, rootClientId ),
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
    moveBlockTo( index ) {
      const { clientId, blockIndex } = ownProps;
      const { getBlockCount, getBlockRootClientId } = registry.select( 'core/block-editor' );
		  const { moveBlockToPosition } = dispatch( 'core/block-editor' );
      const rootClientId = getBlockRootClientId( clientId );
      const blockCount = getBlockCount( clientId );

      moveBlockToPosition( clientId, rootClientId, rootClientId, index );
    },
  } ) )
)( ColumnEdit );
