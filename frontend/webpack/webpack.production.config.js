var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var config = require('./webpack.base.config.js');

config.entry = {
  main: [
    path.join(__dirname, '../src/js/index')
  ]
};

config.output = {
  path: path.join(__dirname, '../builds/'),
  filename: '[name]-[hash].min.js',
  publicPath: '/static/builds/'
};

config.optimization = {
  minimize: true
}

config.plugins = [
  new BundleTracker({ filename: './frontend/webpack/webpack-stats.production.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BASE_URL: JSON.stringify('http://0.0.0.0/'),
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
];

module.exports = config;