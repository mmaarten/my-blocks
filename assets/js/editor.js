
import '../css/editor.scss';

import domReady from '@wordpress/dom-ready';
import { doAction } from '@wordpress/hooks';

domReady( () => {
  doAction( 'my-blocks_init' );
} );

//
// Settings
//

import { __ } from '@wordpress/i18n';
import { addAction } from '@wordpress/hooks';
import { dispatch } from '@wordpress/data';
import { colors, fontSizes } from './config';

addAction( 'my-blocks_init', 'my-blocks/settings', () => {
  const { updateSettings } = dispatch( 'core/block-editor' );
  updateSettings( { colors, fontSizes } );
}, 5 );
