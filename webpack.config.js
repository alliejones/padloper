module.exports = {
  entry: "./src/padloper.js",
  output: {
    path: __dirname+"/demo",
    filename: "padloper.js"
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
    }]
  },
  devtool: 'cheap-module-eval-source-map'
};
