var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: process.env.NODE_ENV == "production" ? false : true,
});


module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './app/App'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  externals:{
    "jquery": "jQuery"
  },
  plugins: [
    definePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jQuery",
      jquery: "jQuery"
    })
  ],
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
      }
    ]
  }
};
