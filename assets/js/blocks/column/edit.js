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
import {
  compose,
} from '@wordpress/compose';
import {
  withSelect,
} from '@wordpress/data';
import
classnames
from 'classnames';

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
    } = this.props;

    const {
      width,
    } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody>
            <SelectControl
              label={ __( 'Width' ) }
              value={ width }
              onChange={ ( value ) => setAttributes( { width: value } ) }
              options={ [
                { label: __( "- Don't set -" ), value: '' },
                { label: __( '1 column - 1/12' ), value: 1 },
                { label: __( '2 column - 1/6' ), value: 2 },
                { label: __( '3 column - 1/4' ), value: 3 },
                { label: __( '4 column - 1/3' ), value: 4 },
                { label: __( '5 column - 5/12' ), value: 5 },
                { label: __( '6 column - 1/2' ), value: 6 },
                { label: __( '7 column - 7/12' ), value: 7 },
                { label: __( '8 column - 8/12' ), value: 8 },
                { label: __( '9 column - 9/12' ), value: 9 },
                { label: __( '10 column - 5/6' ), value: 10 },
                { label: __( '11 column - 11/12' ), value: 11 },
                { label: __( '12 column - 1/1' ), value: 12 },
              ] }
            />
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
