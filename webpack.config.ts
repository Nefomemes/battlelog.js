import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import path from "path";

const config = {
  entry: "./src/index.ts ",
  devtool: "inline-source-map",
  output: {
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "bljs"
  },
  plugins: [new NodePolyfillPlugin()],
  externals: {
    axios: {
      commonjs: "axios",
      commonjs2: "axios",
      amd: "axios",
      root: "_"
    }, 

 
  },
  resolve: {
    plugins: [
      PnpWebpackPlugin
    ]
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            "transpileOnly": true
          }
        },
      },
    ],
  },
};

export default config;