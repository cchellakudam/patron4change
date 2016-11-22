/* eslint no-console: 0 */
import express from 'express';
import path from 'path';

import React from 'react'
import { renderToString } from 'react-dom/server'

import { RouterContext, match } from 'react-router';
import routes from '../common/routes/routing';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from '../common/middleware/PromiseMiddleware';
import combinedReducers from '../common/reducers';

import fetchComponentData from '../common/utils/fetchComponentData';

const finalCreateStore = applyMiddleware(promiseMiddleware)( createStore );

console.log( 'env: ', process.env.NODE_ENV )

// make sure styles are only loaded for client resources
delete process.env.BROWSER;

const app = express();

app.use('/assets', express.static(path.join(__dirname, '../client/assets')))

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// init database
require('../server/model').sequelize.sync();

const apiRoutes = require('./api/routes/api.routes.js');

function renderFullPage(html, initialState) {
  return `
	<!doctype html>
	<html lang="utf-8">
	  <head>
		<title>patron4change</title>
    <link rel="stylesheet" href="/css/base/normalize.min.css">
	  </head>
	  <body>
	  <div class="container">${html}</div>
		<script>window.$REDUX_STATE = ${initialState}</script>
		<script src="/static/bundle.js"></script>
	  </body>
	</html>
	`
}

app.use('/api', apiRoutes);


// server rendering
app.use( ( req, res ) => {

	const store = finalCreateStore(combinedReducers);

	// match react-router routes
	match( {routes, location: req.url}, ( error, redirectLocation, renderProps ) => {

    function render() {
  		const initView = renderToString(
  			<Provider store={store}>
  			  <RouterContext {...renderProps} />
  			</Provider>
  		)

  		let state = JSON.stringify( store.getState() );
  		return renderFullPage( initView, state );
    }

    function okPage(page) {
      return res.status(200).send(page);
    }

    function endWithError(err) {
      return res.end(err.message);
    }

		if ( error ) {
      console.error(error);
			res.status(500).send( error.message );
			return;
		}

		if ( redirectLocation ) {
			res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
			return;
		}

		if ( null === renderProps ) {
			res.status(404).send( 'Not found' );
			return;
		}

		// this is where universal rendering happens,
		// fetchComponentData() will trigger actions listed in static "needs" props in each container component
		// and wait for all of them to complete before continuing rendering the page,
		// hence ensuring all data needed was fetched before proceeding
		//
		// renderProps: contains all necessary data, e.g: routes, router, history, components...
		fetchComponentData( store.dispatch, renderProps.components, renderProps.params)
		.then(render)
		.then(okPage)
		.catch(endWithError);
	})
});



// example of handling 404 pages
app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher
app.use((err, req, res) => {
  console.error('Error on request %s %s', req.method, req.url);
  console.error(err.stack);
  res.status(500).send('Server error');
});

process.on('uncaughtException', evt => {
  console.log( 'uncaughtException: ', evt );
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
