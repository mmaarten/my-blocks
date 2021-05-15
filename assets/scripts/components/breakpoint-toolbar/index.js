import { __ } from '@wordpress/i18n';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import { mobile, desktop, tablet } from '@wordpress/icons';

const BreakpointToolbar = ( {
  breakpoint,
  setState,
  onChange,
} ) => {

  return (
    <>
      <Toolbar label={ __( 'Device navigation', 'my-blocks' ) } className="my-blocks-breakpoint-toolbar">
        <ToolbarButton
          icon={ mobile }
          label={ __( 'Mobile', 'my-blocks' ) }
          onClick={ () => { setState( { breakpoint : 'xs' } ) } }
          isPressed={ 'xs' === breakpoint }
        />
        <ToolbarButton
          icon={ tablet }
          label={ __( 'Tablet', 'my-blocks' ) }
          onClick={ () => { setState( { breakpoint : 'md' } ) } }
          isPressed={ 'md' === breakpoint }
        />
        <ToolbarButton
          icon={ desktop }
          label={ __( 'Desktop', 'my-blocks' ) }
          onClick={ () => { setState( { breakpoint : 'xl' } ) } }
          isPressed={ 'xl' === breakpoint }
        />
      </Toolbar>
      { onChange && onChange( breakpoint ) }
    </>
  );
};

export default withState( {
  breakpoint: 'xs',
} )( BreakpointToolbar );
