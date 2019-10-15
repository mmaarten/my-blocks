import { map, get } from 'lodash';

export const defaultBreakpoint = 'md';
export const gridColumns = 12;
export const gridBreakpoints = [ 'xs', 'sm', 'md', 'lg', 'xl' ];

export const getColumnClasses = ( attributes ) => {
  const { width, offset, order } = attributes;
  const FALLBACK_CLASS = defaultBreakpoint && 'xs' !== defaultBreakpoint ? `col-${defaultBreakpoint}` : 'col';

  let classes = {};

  // Add `col` class for when no width is set.
  classes[ FALLBACK_CLASS ] = true;

  map( gridBreakpoints, ( breakpoint ) => {
    const slug = 'xs' !== breakpoint ? `-${ breakpoint }` : '';

    const _width = get( width, breakpoint );
    const _offset = get( offset, breakpoint );
    const _order = get( order, breakpoint );

    classes[`col${ slug }-${ _width }`] = _width;
    classes[`offset${ slug }-${ _offset }`] = _offset;
    classes[`order${ slug }-${ _order }`] = _order;

    // Width is set. Remove `col` class.
    if ( _width && classes[ FALLBACK_CLASS ] ) {
      classes[ FALLBACK_CLASS ] = false;
    };

  } );

  return classes;
};
