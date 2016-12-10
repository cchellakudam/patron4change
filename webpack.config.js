let path = require('path');
let webpack = require('webpack');

module.exports = {

  context: __dirname,

  devtool: 'eval',

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
  	// new webpack.optimize.OccurenceOrderPlugin(),
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true)
        }
    })
  ],

  sassLoader: {
    data: '@import "theme/_theme.scss";',
    includePaths: [path.resolve(__dirname, './client/css')]
  },

  resolve: {
  	alias: {
  	},
  	extensions: ['', '.scss', '.css', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
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
  		    plugins: [ 'transform-decorators-legacy' ]
  		  }
  		}, {
        test: /\.scss$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass',
				include: [
          path.resolve(__dirname, 'node_modules/react-toolbox'),
          path.resolve(__dirname, 'common'),
          path.resolve(__dirname, 'client')
        ]
      }, {
				test: /\.css$/,
				loader: 'style!css?modules',
				include: /flexboxgrid/
			}
  	]
  }
};
