const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry : {
    'editor-script': './assets/scripts/editor.js',
    'editor-style': './assets/styles/editor.scss',
    'blocks-style': './assets/styles/blocks.scss',
  },
};
