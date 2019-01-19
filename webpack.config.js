var path = require('path')
var webpack = require('webpack')

module.exports = {
  // Entry point for static analyzer
  entry: path.join(__dirname, 'public', 'js', 'app.js'),
  mode: 'development',

  output: {
    // Where to build results
    path: path.join(__dirname, 'assets'),

    // Filename to use in HTML
    filename: 'bundle.js',

    // Path to use in HTML
    publicPath: '/'
  },

  resolve: {
    alias: {
      app: path.join(__dirname, 'public', 'js', 'app'),
      marionette: 'backbone.marionette',
      'sweet-alert': 'sweetalert',
      tpl: path.join(__dirname, 'public', 'js', 'tpl')
    }
  },

  resolveLoader: {
    alias: {
      text: 'raw-loader'
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      Backbone: 'backbone',
      jQuery: 'jquery'
    })
  ],

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.json$/, use: ['json-loader'] },
      { test: /\.png$/, use: 'url-loader?limit=8192&mimetype=image/png' },
      { test: /\.jpe?g$/, use: 'url-loader?limit=8192&mimetype=image/jpg' },
      { test: /\.gif$/, use: 'url-loader?limit=8192&mimetype=image/gif' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=8192&mimetype=image/svg+xml' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=8192&mimetype=application/font-woff2' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=8192&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=8192&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' }
    ]
  },

  devtool: '#inline-source-map'
}
