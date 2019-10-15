import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const BreakpointNavigation = ( {
  breakpoint,
  setState,
  onSelect,
} ) => {

  const controls = [
    {
      icon: 'smartphone',
      title: __( 'Extra Small Devices' ),
      isActive: 'xs' === breakpoint,
      onClick: () => { setState( { breakpoint: 'xs' } ) },
    },
    {
      icon: 'tablet',
      title: __( 'Small Devices' ),
      isActive: 'sm' === breakpoint,
      onClick: () => { setState( { breakpoint: 'sm' } ) },
    },
    {
      icon: 'tablet',
      title: __( 'Medium Devices' ),
      isActive: 'md' === breakpoint || ! breakpoint,
      onClick: () => { setState( { breakpoint: 'md' } ) },
    },
    {
      icon: 'desktop',
      title: __( 'Large Devices' ),
      isActive: 'lg' === breakpoint,
      onClick: () => { setState( { breakpoint: 'lg' } ) },
    },
    {
      icon: 'desktop',
      title: __( 'Extra Large Devices' ),
      isActive: 'xl' === breakpoint,
      onClick: () => { setState( { breakpoint: 'xl' } ) },
    },
  ];

  return (
    <>
      <Toolbar controls={ controls } />
      { onSelect && onSelect( breakpoint ) }
    </>
  );
};

export default withState( {
  breakpoint: 'md',
} )( BreakpointNavigation );
