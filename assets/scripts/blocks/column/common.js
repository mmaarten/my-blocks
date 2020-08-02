import { map, get, kebabCase } from 'lodash';

export const gridColumns = 12;

export const getColumnClasses = ( attributes ) => {
  const { width, offset, order } = attributes;
  const FALLBACK_CLASS = 'col';

  let classes = {};

  // Add `col` class for when no width is set.
  classes[ FALLBACK_CLASS ] = true;

  map( myBlocksSettings.gridBreakpoints, ( breakpoint ) => {
    const slug = 'xs' !== breakpoint ? `-${ kebabCase( breakpoint ) }` : '';

    const _width = get( width, breakpoint );
    const _offset = get( offset, breakpoint );
    const _order = get( order, breakpoint );

    classes[`col${ slug }-${ kebabCase( _width ) }`] = _width;
    classes[`offset${ slug }-${ kebabCase( _offset ) }`] = _offset;
    classes[`order${ slug }-${ kebabCase( _order ) }`] = _order;

    // Width is set. Remove `col` class.
    if ( _width && classes[ FALLBACK_CLASS ] ) {
      classes[ FALLBACK_CLASS ] = false;
    };

  } );

  return classes;
};
