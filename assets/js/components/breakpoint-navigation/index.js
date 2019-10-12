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
      isActive: 'md' === breakpoint || ! breakpoint,
      onClick: () => { setState( { breakpoint: 'md' } ) },
    },
    {
      icon: 'desktop',
      title: __( 'Large Devices' ),
      isActive: 'lg' === breakpoint,
      onClick: () => { setState( { breakpoint: 'lg' } ) },
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
