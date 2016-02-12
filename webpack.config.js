var argv = require('minimist')(process.argv.slice(2));
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: "./src/padloper.js",
  output: {
    path: __dirname+"/demo",
    filename: "padloper.js",
    publicPath: "/demo/"
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
  plugins: []
};

if (argv.production) {

  // PROD CONFIG

  config.plugins.push(new ExtractTextPlugin('[name].css'));

  config.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
  });

} else {

  // DEV CONFIG

  Object.assign(config, {
    devtool: 'cheap-module-eval-source-map'
  });

  config.module.loaders.push({
    test: /\.css$/,
    loader: "style!css"
  });

}

module.exports = config;
