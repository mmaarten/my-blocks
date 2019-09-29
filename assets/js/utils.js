import {
  map,
} from 'lodash';

export const getComputedStylePropertyValue = ( className, prop ) => {
  const elem = document.createElement('div');
  elem.className = className;

  document.body.appendChild( elem );
  const value = window.getComputedStyle( elem ).getPropertyValue( prop );
  document.body.removeChild( elem );

  return value;
}
