import path from 'path'
import WebpackDevServer from 'webpack-dev-server'
import express from 'express'
import config from './config'

const APP_PORT = 3001

var compiler = require('./compiler')

let contentBase = 'src/'
if (process.env.NODE_ENV === 'production') {
  contentBase = 'lib/'
}

var app = new WebpackDevServer(compiler, {
  contentBase: contentBase,
  publicPath: '/js/',
  proxy: { '/graphql': config.scapholdUrl },
  stats: {colors: true}
})
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, '/')))
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`)
})
