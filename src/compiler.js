import path from 'path'
import webpack from 'webpack'

module.exports = webpack({
  entry: {
    vue: path.resolve(__dirname, 'js', 'vue', 'app.js')
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  output: {
    filename: '[name].app.js',
    path: '/'
  }
})
