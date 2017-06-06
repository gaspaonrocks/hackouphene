const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const babiliPlugin = require('babili-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin')

const PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Common options
 */
const linterConfig = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'eslint-loader',
    options: {
      failOnWarning: false,
      failOnError: true
    }
  }]
};

/**
 * Server options
 */
const serverConfig = {
  target: 'node',
  node: {
    __dirname: true
  },
  entry: {
    server: path.resolve('server.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      linterConfig,
      {
        test: /\.js$/,
        include: path.resolve('server'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015'],
              ['env', {
                targets: {
                  node: 'current'
                },
                modules: false,
                debug: false
              }]
            ]
          }
        }]
      }
    ],
  },
  plugins: [
    PRODUCTION && new babiliPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true
    })
  ].filter(e => e),
  devtool: PRODUCTION ? 'source-map' : 'eval-source-map',
};

/**
 * Client application options
 */
const clientConfig = {
  target: 'web',
  entry: {
    index: path.resolve('client/js/index.js')
  },
  output: {
    path: path.resolve('dist/public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      linterConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('client'),
        use: [{
          loader: 'ng-annotate-loader'
        }, {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015'],
              ['env', {
                targets: {
                  browsers: ['> 5%', 'last 2 versions']
                },
                modules: false,
                debug: false
              }],
              ['angular']
            ]
          }
        }]
      }, {
        test: /\.(jpe?g|gif|png|svg|woff|woff2|ttf|eot|wav|mp3|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1
          }
        }]
      }, {
        test: /\.s?css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: PRODUCTION
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: PRODUCTION
          }
        }]
      }
    ]
  },
  plugins: [
    new extractTextPlugin('[name].css'),
    PRODUCTION && new babiliPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION)
    }),
    new htmlWebpackPlugin({
      template: path.resolve('client/index.html'),
      favicon: path.resolve('client/favicon.ico')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({
        resource
      }) => /node_modules/.test(resource)
    })
  ].filter(e => e),
  devtool: PRODUCTION ? 'source-map' : 'eval-source-map',
};

// Notice that both configurations are exported
module.exports = [serverConfig, clientConfig];