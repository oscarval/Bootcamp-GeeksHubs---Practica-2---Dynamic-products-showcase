const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
};

module.exports = {
  context: __dirname,
  mode: "production",
  entry: {
    app: [PATHS.src],
  },
  output: {
    path: PATHS.dist,
    filename: "[name].[chunkhash].js",
    publicPath: "./",
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
  resolve: {
    extensions: [".js"],
    alias: {
      styles: path.resolve(__dirname, "../src/styles"),
    },
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "../node_modules/html-webpack-template/index.ejs",
      title: "Dynamic products Showcase",
      favicon: "../src/favicon.ico",
      meta: [
        {
          name: "robots",
          content: "index,follow",
        },
        {
          name: "description",
          content: "GeeksHubs Practice 2 using ES6, SASS, Bootstrap",
        },
        {
          name: "keywords",
          content: "geekshubs, practice, es6+, sass, webpack, html5, boostrap",
        },
      ],
      appMountIds: ["app"],
      inject: false,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        useShortDoctype: true,
        html5: true,
      },
      mobile: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(PATHS.src, "favicon.ico"),
        to: path.join(PATHS.dist, "favicon.ico"),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("1.2.0"),
      DEBUG: false,
    }),
  ],
};
