var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/App.js'),
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  externals:{
    "jquery": "jQuery"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
