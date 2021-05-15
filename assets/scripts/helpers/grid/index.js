import { get } from 'lodash';

export const getGridColumns = () => {
  return get( myBlocksSettings, 'gridColumns', 12 );
}

export const getGridBreakpoints = () => {
  return get( myBlocksSettings, 'gridBreakpoints', ['xs', 'md', 'xl'] );
}

export const getBreakpointInfix = ( breakpoint ) => {
  return 'xs' === breakpoint ? '' : `-${ breakpoint }`;
}
