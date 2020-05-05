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
  resolve: {
    extensions: [".js"],
    alias: {
      styles: path.resolve(__dirname, "../src/styles"),
    },
  },
  devtool: "eval-sourcemap",
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
          content: "noindex,nofollow",
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(PATHS.src, "favicon.ico"),
        to: path.join(PATHS.dist, "favicon.ico"),
      },
    ]),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      VERSION: JSON.stringify("1.2.0"),
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
