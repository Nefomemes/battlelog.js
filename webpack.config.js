const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = { 
  plugins: [
    new NodePolyfillPlugin()
    ],
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }
  ]
}
}
