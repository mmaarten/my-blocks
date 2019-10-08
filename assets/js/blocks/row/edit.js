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
import {
  compose,
} from '@wordpress/compose';
import {
  withDispatch,
  withSelect,
} from '@wordpress/data';
import {
  createBlock,
} from '@wordpress/blocks';
import
{
  times,
  dropRight,
} from 'lodash';

const ALLOWED_BLOCKS = [ 'my/column' ];
const DEFAULT_COLUMNS = 1;
const MIN_COLUMNS = 1;
const MAX_COLUMNS = 6;

class RowEdit extends Component {
  constructor() {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
      className,
      updateColumns,
      columns,
    } = this.props;

    return (
      <>
        <InspectorControls>
          <PanelBody>
            <RangeControl
              label={ __( 'Columns' ) }
              value={ columns }
              onChange={ ( value ) => updateColumns( columns, value ) }
              min={ MIN_COLUMNS }
              max={ MAX_COLUMNS }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ className }>
          <InnerBlocks
            template={ times( columns ? columns : DEFAULT_COLUMNS, () => [ 'my/column' ] ) }
            templateLock="all"
            allowedBlocks={ ALLOWED_BLOCKS } />
        </div>
      </>
    );
  }
}

export default compose( [
  withSelect( ( select, props ) => {
    const { clientId } = props;

    return {
      columns : select( 'core/block-editor' ).getBlockCount( clientId ),
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

      console.log( 'innerBlocks', innerBlocks );

      replaceInnerBlocks( clientId, innerBlocks, false );
    },

  } ) ),

] )( RowEdit );
