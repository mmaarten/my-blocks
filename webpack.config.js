const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  entry: {
    'editor': './assets/styles/editor.scss',
    'style': './assets/styles/style.scss',
    'script': './assets/scripts/script.js',
    'button': './assets/scripts/blocks/button/index.js',
    'card': './assets/scripts/blocks/card/index.js',
    'column': './assets/scripts/blocks/column/index.js',
    'modal': './assets/scripts/blocks/modal/index.js',
    'row': './assets/scripts/blocks/row/index.js',
  },
};
