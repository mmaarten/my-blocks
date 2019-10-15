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
      title: __( 'Small Devices' ),
      isActive: 'xs' === breakpoint,
      onClick: () => { setState( { breakpoint: 'xs' } ) },
    },
    {
      icon: 'tablet',
      title: __( 'Medium Devices' ),
      isActive: 'sm' === breakpoint || ! breakpoint,
      onClick: () => { setState( { breakpoint: 'sm' } ) },
    },
    {
      icon: 'desktop',
      title: __( 'Large Devices' ),
      isActive: 'md' === breakpoint,
      onClick: () => { setState( { breakpoint: 'md' } ) },
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
  breakpoint: 'sm',
} )( BreakpointNavigation );
