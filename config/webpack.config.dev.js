const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
};

module.exports = {
  context: __dirname,
  mode: "development",
  entry: {
    app: [PATHS.src],
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: "file-loader",
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "Dynamic products Showcase",
      template: path.join(PATHS.src, "index.html"),
      filename: path.join(PATHS.dist, "index.html"),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(PATHS.src, "favicon.ico"),
        to: path.join(PATHS.dist, "favicon.ico"),
      },
    ]),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      VERSION: JSON.stringify("1.0.0"),
      DEBUG: true,
      CODE_FRAGMENT: "80 + 5",
    }),
  ],
  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8080,
    publicPath: "http://localhost:8080/",
    hot: true,
  },
};
