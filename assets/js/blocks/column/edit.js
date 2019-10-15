import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
  PanelBody,
  BaseControl,
  RangeControl
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
  BlockControls,
  BlockVerticalAlignmentToolbar
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { get, assign } from 'lodash';
import classnames from 'classnames';
import { gridColumns, defaultBreakpoint } from './common';
import { BreakpointNavigation } from './../../components';

class ColumnEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const { attributes, setAttributes, className, hasChildBlocks } = this.props;
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
		const { getBlockOrder } = select( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
)( ColumnEdit );
