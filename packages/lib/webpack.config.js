const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const DeclarationBundlerPlugin = require("webpack-plugin-typescript-declaration-bundler");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "bljs",
  },
  plugins: [
    new NodePolyfillPlugin(),
    new DeclarationBundlerPlugin({
      moduleName: "battlelog.js",
      out: "../src/bljs.d.ts",
    }),
  ],
  externals: {
    axios: {
      commonjs: "axios",
      commonjs2: "axios",
      amd: "axios",
      root: "_",
    },
  },

  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
};
