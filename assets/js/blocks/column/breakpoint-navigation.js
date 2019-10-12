import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const BreakpointNavigation = ( {
  breakpoint,
  setState,
  content,
} ) => {

  const controls = [
    {
      icon: 'smartphone',
      title: __( 'Extra small devices' ),
      isActive: 'xs' === breakpoint,
      onClick: () => { setState( { breakpoint: 'xs' } ) },
    },
    {
      icon: 'tablet',
      title: __( 'Small devices' ),
      isActive: 'sm' === breakpoint,
      onClick: () => { setState( { breakpoint: 'sm' } ) },
    },
    {
      icon: 'tablet',
      title: __( 'Medium devices' ),
      isActive: 'md' === breakpoint || ! breakpoint,
      onClick: () => { setState( { breakpoint: 'md' } ) },
    },
    {
      icon: 'desktop',
      title: __( 'Large devices' ),
      isActive: 'lg' === breakpoint,
      onClick: () => { setState( { breakpoint: 'lg' } ) },
    },
    {
      icon: 'desktop',
      title: __( 'Extra large devices' ),
      isActive: 'xl' === breakpoint,
      onClick: () => { setState( { breakpoint: 'xl' } ) },
    }
  ];

  return (
    <>
      <Toolbar controls={ controls } />
      { content && content( breakpoint ) }
    </>
  );
};

export default withState( {
  breakpoint: 'md',
} )( BreakpointNavigation );
