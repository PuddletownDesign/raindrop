/**
 * Requires
 */
const path = require('path')
const webpack = require('webpack')

const pwd = process.cwd()

/**
 * Webpack config
 */
module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'src',
    filename: 'bundle.js'
  },
  module: {

  }
}
