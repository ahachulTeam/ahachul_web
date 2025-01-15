const { override, addBabelPreset, addWebpackPlugin } = require('customize-cra');
const FontPreloadPlugin = require('webpack-font-preload-plugin');

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addWebpackPlugin(
    new FontPreloadPlugin({
      extensions: ['woff2'],
    }),
  ),
);
