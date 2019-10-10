import {
  __,
} from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';
import {
	PanelBody,
  RangeControl,
  Toolbar,
} from '@wordpress/components';
import {
  InspectorControls,
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  compose,
} from '@wordpress/compose';
import {
  withSelect,
} from '@wordpress/data';
import {
  get,
  assign,
} from 'lodash';
import
classnames
from 'classnames';
import './common';

class ColumnEdit extends Component {
  constructor() {
    super( ...arguments );

    this.state = {
      breakpoint: 'md',
    };
  }

  getBreakpointNavigation() {
    const { breakpoint } = this.state;

    const controls = [
      {
        icon: 'admin-generic',
        title: __( 'Extra small' ),
        isActive: 'xs' === breakpoint,
        onClick: () => { this.setState( { breakpoint: 'xs' } ) },
      },
      {
        icon: 'admin-generic',
        title: __( 'Small' ),
        isActive: 'sm' === breakpoint,
        onClick: () => { this.setState( { breakpoint: 'sm' } ) },
      },
      {
        icon: 'admin-generic',
        title: __( 'Medium' ),
        isActive: 'md' === breakpoint || ! breakpoint,
        onClick: () => { this.setState( { breakpoint: 'md' } ) },
      },
      {
        icon: 'admin-generic',
        title: __( 'Large' ),
        isActive: 'lg' === breakpoint,
        onClick: () => { this.setState( { breakpoint: 'lg' } ) },
      },
      {
        icon: 'admin-generic',
        title: __( 'Extra large' ),
        isActive: 'xl' === breakpoint,
        onClick: () => { this.setState( { breakpoint: 'xl' } ) },
      }
    ];

    return <Toolbar controls={ controls } />
  }

  getBreakpointSettings() {
    const { breakpoint } = this.state;
    const { attributes, setAttributes } = this.props;
    const { width, offset, order } = attributes;

    console.log( { breakpoint, width } );

    return (
      <>
        <RangeControl
          label={ __( 'Width' ) }
          value={ get( width, breakpoint, '' ) }
          onChange={ ( value ) => {
            const update = { [ breakpoint ]: value };
            setAttributes( { width: assign( {}, width, update ) } );
          } }
          min={ 0 }
          max={ 12 }
        />
        <RangeControl
          label={ __( 'Offset' ) }
          value={ get( offset, breakpoint, '' ) }
          onChange={ ( value ) => {
            const update = { [ breakpoint ]: value };
            setAttributes( { offset: assign( {}, offset, update ) } );
          } }
          min={ 0 }
          max={ 12 }
        />
        <RangeControl
          label={ __( 'Order' ) }
          value={ get( order, breakpoint, '' ) }
          onChange={ ( value ) => {
            const update = { [ breakpoint ]: value };
            setAttributes( { width: assign( {}, order, update ) } );
          } }
          min={ 0 }
          max={ 12 }
        />
      </>
    );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
      hasChildBlocks,
    } = this.props;

    const {
      width,
    } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __( 'Column Settings' ) } initialOpen={ true }>
            { this.getBreakpointNavigation() }
            { this.getBreakpointSettings() }
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          templateLock={ false }
          renderAppender={ (
            // Show appender when no inner blocks.
            hasChildBlocks ?
              undefined :
              () => <InnerBlocks.ButtonBlockAppender />
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
