var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.entry = {
  main: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../src/js/index')
  ]
};

config.devtool = 'eval';
config.output = {
  path: path.join(__dirname, '../builds-dev/'),
  filename: '[name]-[hash].js',
  publicPath: 'http://127.0.0.1:3000/builds/',
};

config.module.rules[0].use[0].options.plugins = ['react-hot-loader/babel'];

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new BundleTracker({ filename: './frontend/webpack/webpack-stats.dev.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_URL: JSON.stringify('http://127.0.0.1:8000/'),
    }
  })
];

config.devServer = {
  inline: true,
  hot: true,
  historyApiFallback: true,
  host: '127.0.0.1',
  port: 3000,
  headers: { 'Access-Control-Allow-Origin': '*' }
};

module.exports = config;