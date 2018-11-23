const path = require('path')

module.exports = {
  entry: './app/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'app', 'dist'),
    host: '0.0.0.0',
    port: '8080',
    open: true,
    hot: true
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
  plugins: []
}
