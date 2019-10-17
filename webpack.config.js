const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const config = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...config,
  entry : {
    'editor': './assets/css/editor/editor.scss',
    'style': './assets/css/style/style.scss',
    'row': './assets/js/blocks/row/index.js',
    'column': './assets/js/blocks/column/index.js',
    'button': './assets/js/blocks/button/index.js',
    'heading': './assets/js/blocks/heading/index.js',
  },
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(scss|sass|css)$/,
        use: [
          {
            loader : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function() {
                return [ require('autoprefixer') ];
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ]
  },
  plugins: [
    ...config.plugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackBar(),
  ]
};
