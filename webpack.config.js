const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  entry: {
    'editor': './assets/styles/editor.scss',
    'style': './assets/styles/style.scss',
    'script': './assets/scripts/script.js',
    'column': './assets/scripts/blocks/column/index.js',
    'row': './assets/scripts/blocks/row/index.js',
  },
};
