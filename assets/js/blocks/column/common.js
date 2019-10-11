import { map, get } from 'lodash';

export const gridColumns = 12;
export const breakpoints = [ 'xs', 'sm', 'md', 'lg', 'xl' ];

export const getColumnClasses = ( attributes ) => {
  const { width, offset, order } = attributes;

  let classes = {};

  // Add `col` class for when no width is set.
  classes.col = true;

  map( breakpoints, ( breakpoint ) => {
    const colWidth  = get( width, breakpoint );
    const colOffset = get( offset, breakpoint );
    const colOrder  = get( order, breakpoint );

    classes[`col-${ breakpoint }-${ colWidth }`] = colWidth;
    classes[`offset-${ breakpoint }-${ colOffset }`] = colOffset;
    classes[`order-${ breakpoint }-${ colOrder }`] = colOrder;

    // Width is set. Remove `col` class.
    if ( colWidth && classes.col ) {
      classes.col = false;
    };

  } );

  return classes;
};
