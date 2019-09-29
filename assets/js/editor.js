
import '../css/editor.scss';

import domReady from '@wordpress/dom-ready';
import { dispatch } from '@wordpress/data';
import { map } from 'lodash';
import { getComputedStyle } from './utils';
import {
	getFontSizeClass,
  getColorClassName,
} from '@wordpress/block-editor';
import {
	applyFilters,
} from '@wordpress/hooks';

window.addEventListener( 'load', () => {
  const { updateSettings } = dispatch( 'core/block-editor' );

  let colors = [];
  map( elixir.editorColors, ( name, slug ) => {
    const color = getComputedStyle( getColorClassName( 'color', slug ), 'color' );
    colors.push( { name, slug, color } );
  } );

  let fontSizes = [];
  map( elixir.editorFontSizes, ( name, slug ) => {
    const size = getComputedStyle( getFontSizeClass( slug ), 'font-size' );
    fontSizes.push( { name, slug, size : parseInt( size, 10 ) } );
  } );

  updateSettings( { colors, fontSizes } );
});
