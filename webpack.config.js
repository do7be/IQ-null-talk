const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './app/src/index.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'app', 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.resolve(path.join(__dirname, 'public')),
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
