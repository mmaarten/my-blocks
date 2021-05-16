import { get, map } from 'lodash'

export const getSetting = ( key ) => {
  return get( myBlocksSettings, key );
}

export const getGridColumns = () => {
  return getSetting( 'gridColumns' );
}

export const getGridBreakpoints = () => {
  return getSetting( 'gridBreakpoints' );
}

export const getBreakpointInfix = ( breakpoint ) => {
  return 'xs' === breakpoint ? '' : `-${ breakpoint }`;
}

export const getSelectOptions = ( obj ) => {
  return map( obj, ( label, value ) => ( { label, value } ) );
}
