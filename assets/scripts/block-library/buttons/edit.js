import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const { justifyContent } = attributes;

  const blockProps = useBlockProps({
    className : classnames({
      [`has-justify-content-${justifyContent}`] : justifyContent,
    })
  });

  const ALLOWED_INNER_BLOCKS = [ 'my/button' ];
  const INNER_BLOCKS_TEMPLATE = [ [ 'my/button' ] ];

  return (
    <>
      <InspectorControls>
        <PanelBody initialOpen={ true }>
          <SelectControl
            label={ __( 'Justify Content', 'my-blocks' ) }
            options={ [
              { label: __( 'Left', 'my-blocks' ), value: 'left' },
							{ label: __( 'Center', 'my-blocks' ), value: 'center' },
              { label: __( 'Right', 'my-blocks' ), value: 'right' },
						] }
            value={ justifyContent }
            onChange={ ( justifyContent ) => setAttributes( { justifyContent } ) }
          />
        </PanelBody>
      </InspectorControls>
      <div { ...blockProps }>
        <InnerBlocks
          allowedBlocks={ ALLOWED_INNER_BLOCKS }
          template={ INNER_BLOCKS_TEMPLATE }
          orientation="horizontal"
        />
      </div>
    </>
  );
};
