import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl, Toolbar, ToolbarButton } from '@wordpress/components';
import { InspectorControls, useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { plus } from '@wordpress/icons';

import classnames from 'classnames';

const RowEdit = ( props ) => {
  const { attributes, setAttributes, addBlock } = props;
  const { container, noGutters, verticalAlignment } = attributes;

  const ALLOWED_BLOCKS = [ 'my/column' ];
  const BLOCKS_TEMPLATE = [ [ 'my/column' ] ];

  const blockProps = useBlockProps({
    className: classnames({
      'has-container': 'fixed' === container,
      [`has-container-${ container }`]: container && 'fixed' !== container,
      [`has-align-items-${ verticalAlignment }`]: verticalAlignment,
      'has-no-gutters': noGutters,
    }),
  });

  return (
    <>
      <InspectorControls>
        <PanelBody initialOpen={ true }>
          <SelectControl
            label={ __('Container', 'my-blocks') }
            value={ container }
            onChange={ ( container ) => setAttributes( { container } ) }
            options={ [
              { label: __( 'Fixed Width', 'my-blocks' ), value: 'fixed' },
              { label: __( 'Full Width', 'my-blocks' ), value: 'fluid' },
            ] }
          />
          <ToggleControl
            label={ __( 'No Gutters', 'my-blocks' ) }
            checked={ noGutters }
            onChange={ ( noGutters ) => setAttributes( { noGutters } ) }
          />
          <SelectControl
            label={ __( 'Vertically Align' ) }
            options={ [
              { label: __('- Select -', 'my-blocks'), value: '' },
              { label: __('Top', 'my-blocks'), value: 'start' },
              { label: __('Middle', 'my-blocks'), value: 'center' },
              { label: __('Bottom', 'my-blocks'), value: 'end' },
            ] }
            value={ verticalAlignment }
            onChange={ ( verticalAlignment ) => setAttributes( { verticalAlignment } ) }
          />
        </PanelBody>
      </InspectorControls>
      <BlockControls>
      <Toolbar>
        <ToolbarButton
          icon={ plus }
          label={ __( 'Add Column', 'my-blocks' ) }
          onClick={ () => { addBlock( 'my/column' ) } }
        />
      </Toolbar>
      </BlockControls>
      <div { ...blockProps }>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
          template={ BLOCKS_TEMPLATE }
          orientation="horizontal"
          renderAppender={ false }
        />
      </div>
    </>
  );
}

export default compose( [
  withDispatch( ( dispatch, ownProps, registry ) => ( {
    addBlock( blockType, attributes ) {
      const { clientId } = ownProps;
      const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
      const { getBlocks } = registry.select( 'core/block-editor' );

      let innerBlocks = getBlocks( clientId );

      innerBlocks = [
        ...innerBlocks,
        ...[ createBlock( blockType, attributes ) ],
      ];

      replaceInnerBlocks( clientId, innerBlocks, false );
    }
  } )
) ] )( RowEdit );
