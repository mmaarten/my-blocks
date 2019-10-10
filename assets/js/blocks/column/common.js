import { map, get } from 'lodash';

export const gridColumns = 12;

export const breakpoints = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

export const getColumnsClasses = ( attributes ) => {
  let classes = {};
  const { width, offset, order } = attributes;

  map( breakpoints, ( breakpoint ) => {
    const _width  = get( width, breakpoint );
    const _offset = get( offset, breakpoint );
    const _order  = get( order, breakpoint );

    classes[`col-${ breakpoint }-${ _width }`] = _width;
    classes[`offset-${ breakpoint }-${ _offset }`] = _offset;
    classes[`order-${ breakpoint }-${ _order }`] = _order;
  } );

  return classes;
};
