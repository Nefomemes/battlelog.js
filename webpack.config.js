const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

module.exports = {
  entry : "./src/index.js",
  output : {
    path : path.resolve(__dirname, "dist"),
    filename : "bundle.js",
  },
  plugins : [ new NodePolyfillPlugin() ],
  module : {
    rules : [
      {
        test : /\.m?js$/,
        exclude : /node_modules/,
        use : {
          loader : "babel-loader",
          options : {
            presets : [ [ "@babel/preset-env", {targets : "defaults"} ] ],
            plugins : [ "@babel/plugin-proposal-class-properties" ],
          },
        },
      },
    ],
  },
};
