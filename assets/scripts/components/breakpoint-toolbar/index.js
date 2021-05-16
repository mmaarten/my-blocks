import { __ } from '@wordpress/i18n';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import { mobile, desktop, tablet } from '@wordpress/icons';
import { get, map } from 'lodash';
import { getGridBreakpoints } from '../../helpers';

const BreakpointToolbar = ( {
  breakpoint,
  setState,
  onChange,
} ) => {

  const controls = {
    xs : { icon : mobile, label: __( 'Mobile', 'my-blocks' ) },
    sm : { icon : tablet, label: __( 'Small Tablet', 'my-blocks' ) },
    md : { icon : tablet, label: __( 'Tablet', 'my-blocks' ) },
    lg : { icon : desktop, label: __( 'Small Desktop', 'my-blocks' ) },
    xl : { icon : desktop, label: __( 'Desktop', 'my-blocks' ) },
  };

  const breakpoints = getGridBreakpoints();

  return (
    <>
      <Toolbar label={ __( 'Device navigation', 'my-blocks' ) } className="my-blocks-breakpoint-toolbar">
        { map( breakpoints, ( key, index ) => {
          let control = get( controls, key );
          return control && (
            <ToolbarButton
              key={ index }
              icon={ control.icon }
              label={ control.label }
              onClick={ () => { setState( { breakpoint : key } ) } }
              isPressed={ key === breakpoint }
            />
          )
        } ) }
      </Toolbar>
      { onChange && onChange( breakpoint ) }
    </>
  );
};

export default withState( {
  breakpoint: 'xs',
} )( BreakpointToolbar );
