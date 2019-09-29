
import '../css/editor.scss';

import { dispatch } from '@wordpress/data';
import { getFontSizeClass, getColorClassName } from '@wordpress/block-editor';
import { map } from 'lodash';
import { getComputedStylePropertyValue } from './utils';

window.addEventListener( 'load', () => {
  const { updateSettings } = dispatch( 'core/block-editor' );

  let colors = [];
  map( elixir.editorColors, ( name, slug ) => {
    const className = getColorClassName( 'color', slug );
    const color = getComputedStylePropertyValue( className, 'color' );
    colors.push( { name, slug, color } );
  } );

  let fontSizes = [];
  map( elixir.editorFontSizes, ( name, slug ) => {
    const className = getFontSizeClass( slug );
    const size = getComputedStylePropertyValue( className, 'font-size' );
    fontSizes.push( { name, slug, size : parseInt( size, 10 ) } );
  } );

  updateSettings( { colors, fontSizes } );
});
