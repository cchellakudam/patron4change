let path = require('path');
let webpack = require('webpack');

module.exports = {

  devtool: '#inline-source-map',

  entry: [
  	'webpack-hot-middleware/client', // for hot reload
  	'./client/index.js' // entry point for the client app
  ],

  output: {
  	path: path.join(__dirname, 'build'),
  	filename: 'bundle.js',
  	publicPath: '/static/'
  },

  plugins: [
  	new webpack.optimize.OccurenceOrderPlugin(),
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true)
        }
    })
  ],

  resolve: {
  	alias: {
  	},
  	extensions: ['', '.js']
  },

  module: {
  	loaders: [
  		{
  		  test: /\.js$/,
  		  loader: 'babel',
  		  exclude: /node_modules/,
  		  include: __dirname,
  		  query: {
  		    presets: [ 'react-hmre', 'es2015', 'stage-0', 'react' ],
  		    plugins: [ 'transform-decorators-legacy' ],
  		  }
  		}, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'client/css/modules')
        ],
        loaders: [
          'style-loader',
          'css-loader?module&sourceMap&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'client/css/layout'),
          path.resolve(__dirname, 'client/css/theme')
        ],
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      }
  	]
  }
};
