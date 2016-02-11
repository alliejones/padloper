module.exports = {
  entry: "./src/padloper.js",
  output: {
    path: __dirname+"/demo",
    filename: "padloper.js",
    publicPath: "/"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  },
  devtool: 'cheap-module-eval-source-map'
};
