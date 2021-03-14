const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

module.exports = {
  entry:  './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js",
  libraryTarget: 'umd',
  library: 'bljs',
  },
  plugins: [new NodePolyfillPlugin()],
externals: {
      axios: {
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios',
        root: '_',
      },
    },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
