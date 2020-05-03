const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    home: "./src/home.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["es2017"],
        },
      },
    ],
  },
  devServer: {
    open: true
  }
};
