import { map, get, kebabCase } from 'lodash';

export const gridBreakpoints = [ 'xs', 'sm', 'md', 'lg', 'xl' ];

export const getSpacerClasses = ( attributes ) => {
  const { size } = attributes;

  let classes = {};
  map( gridBreakpoints, ( breakpoint ) => {
    const slug = 'xs' !== breakpoint ? `-${ kebabCase( breakpoint ) }` : '';
    const _size = get( size, breakpoint );

    classes[`has-spacing${ slug }-${ kebabCase( _size ) }`] = _size;
  } );

  return classes;
};
