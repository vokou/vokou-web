module.exports = {
  entry: './app/App.js',
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /\.css$/,
        loader: "style-loader!css-loader" },
      { test: /\.png$/,
        loader: "url-loader?limit=100000" },
      { test: /\.jpg$/,
        loader: "file-loader" },
    ]
  }
};
