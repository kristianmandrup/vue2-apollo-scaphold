import path from 'path'
import webpack from 'webpack'

// webpack 1.14 - old style!
const config = {
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
}

function isBuildEnv() {
  process.env.npm_lifecycle_event === 'build'
}

function addSourceMaps(config) {
  config.devtool = isBuildEnv() ? 'cheap-module-source-map' : 'cheap-module-eval-source-map'
  return config
}

module.exports = webpack(config)