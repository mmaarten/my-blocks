import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const BreakpointNavigation = ( {
  breakpoint,
  setState,
  onChange,
} ) => {

  return (
    <>
      <Toolbar
        controls={ [
          {
            icon: 'smartphone',
            title: __( 'Small Devices' ),
            isActive: 'xs' === breakpoint,
            onClick: () => { setState( { breakpoint: 'xs' } ) },
          },
          {
            icon: 'tablet',
            title: __( 'Medium Devices' ),
            isActive: 'md' === breakpoint,
            onClick: () => { setState( { breakpoint: 'md' } ) },
          },
          {
            icon: 'desktop',
            title: __( 'Large Devices' ),
            isActive: 'lg' === breakpoint,
            onClick: () => { setState( { breakpoint: 'lg' } ) },
          }
        ] }
      />
      { onChange && onChange( breakpoint ) }
    </>
  );
};

export default withState( {
  breakpoint: 'md',
} )( BreakpointNavigation );
