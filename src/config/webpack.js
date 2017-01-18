import path from 'path'
import webpack from 'webpack'

// function isBuildEnv () {
//   process.env.npm_lifecycle_event === 'build'
// }

// function addSourceMaps (config) {
//   config.devtool = isBuildEnv() ? 'cheap-module-source-map' : 'cheap-module-eval-source-map'
//   return config
// }

const config = {
  entry: {
    vue: path.resolve(__dirname, '../js', 'app.js')
  },
  module: {
    rules: [
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
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  output: {
    filename: '[name].app.js',
    path: '/'
  }
}

module.exports = webpack(config)
