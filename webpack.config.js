module.exports = {
  entry: './app/App.js',
  output: {
    filename: "build/bundle.js"
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
  }
};
