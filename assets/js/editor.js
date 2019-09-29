
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

//
// import ReactDOM from 'react-dom';
//
// addAction( 'my-blocks_init', 'my-blocks/settings', () => {
//
//   const wrap = document.createElement('div');
//
//   document.body.appendChild( wrap );
//
//   const Out = () => (
//     <div id="my-blocks-text-colors">
//       <span className="text-primary" data-slug="primary" />
//       <span className="text-secondary" data-slug="secondary" />
//       <span className="text-success" data-slug="success" />
//       <span className="text-info" data-slug="info" />
//       <span className="text-warning" data-slug="warning" />
//       <span className="text-danger" data-slug="danger" />
//       <span className="text-light" data-slug="light" />
//       <span className="text-dark" data-slug="dark" />
//     </div>
//   );
//
//   ReactDOM.render(<Out />, wrap );
//
// }, 0 );
//
// const getThemeColors = () => {
//
//   const colors = [
//     { name: 'red', color: '#f00' },
//     { name: 'white', color: '#fff' },
//     { name: 'blue', color: '#00f' },
//   ];
//
// };
