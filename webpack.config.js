const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  entry: {
    'editor': './assets/styles/editor.scss',
    'style': './assets/styles/style.scss',
    'script': './assets/scripts/script.js',
    'row': './assets/scripts/blocks/row/index.js',
    'column': './assets/scripts/blocks/column/index.js',
    'spacer': './assets/scripts/blocks/spacer/index.js',
  },
};
