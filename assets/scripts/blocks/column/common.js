import { map, get, kebabCase } from 'lodash';

export const gridColumns = 12;
export const gridBreakpoints = [ 'xs', 'sm', 'md', 'lg', 'xl' ];

export const getColumnClasses = ( attributes ) => {
  const { width, offset, order, verticalAlignment } = attributes;
  const FALLBACK_CLASS = 'col-md';

  let classes = {};

  // Add `col` class for when no width is set.
  classes[ FALLBACK_CLASS ] = true;

  map( gridBreakpoints, ( breakpoint ) => {
    const slug = 'xs' !== breakpoint ? `-${ kebabCase( breakpoint ) }` : '';

    const _width = get( width, breakpoint );
    const _offset = get( offset, breakpoint );
    const _order = get( order, breakpoint );
    const _verticalAlignment = get( verticalAlignment, breakpoint );

    classes[`col${ slug }-${ kebabCase( _width ) }`] = _width;
    classes[`offset${ slug }-${ kebabCase( _offset ) }`] = _offset;
    classes[`order${ slug }-${ kebabCase( _order ) }`] = _order;
    classes[`align-items${ slug }-${ kebabCase( _verticalAlignment ) }`] = _verticalAlignment;

    // Width is set. Remove `col` class.
    if ( _width && classes[ FALLBACK_CLASS ] ) {
      classes[ FALLBACK_CLASS ] = false;
    };

  } );

  return classes;
};
