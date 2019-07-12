/* eslint no-unused-vars: 0 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  devServer: {
    contentBase: `${__dirname}/chrome-ext/build`,
  },

  entry: {
    bundle: './chrome-ext/frontend/devtools.js',
    installHook: './chrome-ext/backend/installHook.js',
  },

  output: {
    filename: '[name].js',
    path: `${__dirname}/release/build`,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  // use a load for .jsx and ES6
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2'],
        },
      },
      {
        test: /\.sass$|\.scss$|\.css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader',
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      // {output}/to/file.txt
      { from: 'chrome-ext/manifest.json', to: '../manifest.json' },
      { from: 'chrome-ext/content-script.js', to: '../content-script.js' },
      { from: 'chrome-ext/background.js', to: '../background.js' },
      { from: 'chrome-ext/devtools.html', to: '../devtools.html' },
      { from: 'chrome-ext/asset/', to: '../asset/' },
    ]),
  ],
};
