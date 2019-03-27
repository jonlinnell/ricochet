const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const dotenvWebpack = require('dotenv-webpack')

const paths = require('./paths')

module.exports = {
  entry: paths.src + '/index.jsx',
  output: {
    path: paths.build,
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'Ricochet',
      template: paths.src + '/template/index.html'
    }),
    new extractTextPlugin('bundle.css'),
    new dotenvWebpack({
      path: paths.app + '/.env',
      systemvars: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000,outputPath=fonts/',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?outputPath=fonts/'
      },
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader?outputPath=images/'
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS modules
        },
        {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    tls: 'empty',
    net: 'empty',
    fs: 'empty'
  }
}
