import { map } from 'lodash';
import { getColorClassName, getFontSizeClass } from '@wordpress/block-editor';

/**
 * Get computed style property value.
 */
export const getComputedStylePropertyValue = ( className, property ) => {
  const elem = document.createElement( 'div' );
  elem.className = className;

  document.body.appendChild( elem );
  const value = window.getComputedStyle( elem ).getPropertyValue( property );
  document.body.removeChild( elem );

  return value;
}

/**
 * Get computed colors.
 */
export const getComputedColors = ( slugs ) => {
  let colors = [];
  map( slugs, ( slug ) => {
    const className = getColorClassName( 'color', slug );
    const color = getComputedStylePropertyValue( className, 'color' );
    colors.push( { name : slug, slug, color } );
  } );
  return colors;
}

/**
 * Get computed font sizes.
 */
export const getComputedFontSizes = ( slugs ) => {
  let fontSizes = [];
  map( slugs, ( slug ) => {
    const className = getFontSizeClass( slug );
    const size = getComputedStylePropertyValue( className, 'font-size' );
    fontSizes.push( { name : slug, slug, size : parseInt( size, 10 ) } );
  } );
  return fontSizes;
}
