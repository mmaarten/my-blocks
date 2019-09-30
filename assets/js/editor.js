
import '../css/editor.scss';

import { dispatch } from '@wordpress/data';
import { getComputedColors, getComputedFontSizes } from './utils/';

window.addEventListener( 'load', () => {
  const { updateSettings } = dispatch( 'core/block-editor' );

  const colors = getComputedColors( [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ] );

  const fontSizes = getComputedFontSizes( [
    'small',
    'normal',
    'large',
  ] );

  updateSettings( { colors, fontSizes } );
} );
