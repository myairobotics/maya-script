const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["@babel/runtime/regenerator", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "maya.js",
    library: "MayaWidget",
    libraryTarget: "umd",
    globalObject: "this",
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                  targets: "> 0.25%, not dead",
                },
              ],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3,
                  helpers: true,
                  regenerator: true,
                  useESModules: false,
                  version: "^7.22.5",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
