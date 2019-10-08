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
            <RangeControl
              label={ __( 'Width' ) }
              value={ width }
              onChange={ ( value ) => setAttributes( { width : value } ) }
              min={ 1 }
              max={ 12 }
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          templateLock={ false }
          renderAppender={ (
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
