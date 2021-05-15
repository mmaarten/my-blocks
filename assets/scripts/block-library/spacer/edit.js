import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { get, assign } from 'lodash';
import { BreakpointToolbar } from '../../components';
import { getClasses } from './common';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const { sizes } = attributes;

  const blockProps = useBlockProps({
    className: getClasses( attributes ),
    'aria-hidden': 'true',
  });

  const sizeOptions = [
    { label: __( 'Small', 'my-blocks' ), value: 3 },
    { label: __( 'Medium', 'my-blocks' ), value: 4 },
    { label: __( 'Large', 'my-blocks' ), value: 5 },
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody initialOpen={ true }>
          <BreakpointToolbar
            onChange={ ( breakpoint ) => {

              let options = [ ...sizeOptions ];

              if ( 'xs' !== breakpoint ) {
                options = [
                  { label: __( '- Inherit from smaller -', 'my-blocks' ), value: '' },
                  ...options
                ];
              }

              return (
                <SelectControl
                  label={ __( 'Size', 'my-blocks' ) }
                  options={ options }
                  value={ get( sizes, breakpoint, '' ) }
                  onChange={ ( value ) => {
                    setAttributes( {
                      sizes: assign( {}, sizes, { [ breakpoint ]: value } )
                    } );
                  } }
                />
              );
             } }
          />
        </PanelBody>
      </InspectorControls>
      <div { ...blockProps } />
    </>
  );
};
