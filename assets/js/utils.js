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

export const getSelectControlOptions = ( obj, optionNone ) => {

    let options = map( obj, ( label, value ) => ( { label, value } ) );

    if ( optionNone ) {
        const option = { label: optionNone, value: null };
        options = [ [ option ], ...options ];
    }

    return options;
};
