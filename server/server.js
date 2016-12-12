import express from 'express';
import path from 'path';
import uuid from 'uuid';

import serverRender from './render';
import apiRoutes from './api/routes';

import createLogger from './logger';
import runWorkers from './workers';
import model from './model';
import rebuildSearchIndex from './utils/rebuildSearchIndex';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';
import appConfig from 'config';

import winstonRequestLogger from 'winston-request-logger';

let logger = createLogger();
logger.log('debug', 'env: %s', process.env.NODE_ENV);

// make sure styles are only loaded for client resources
delete process.env.BROWSER;

const app = express();

app.use('/css', express.static(path.join(__dirname, '../client/css')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
	// request id for log correlation
	req.reqId = uuid.v4();
	req.logger = createLogger(req.reqId);
	next();
});

app.use(winstonRequestLogger.create(logger, {
	responseTime: ':responseTime ms', // outputs '5 ms'
  url: ':url[pathname]'             // outputs '/some/path'
}));

if ('production' !== process.env.NODE_ENV) {
	const compiler = webpack(config);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
	}));
	app.use(webpackHotMiddleware(compiler));
}

runWorkers(appConfig.get('queues'), logger);

// init database
let databaseInit;
if('unit' !== process.env.NODE_ENV){
	databaseInit = model.sequelize.sync({
		logging: str => logger.log('silly', str)
	});
} else {
	databaseInit = Promise.resolve(true);
}
databaseInit.then(rebuildSearchIndex);

app.use('/api', apiRoutes);

// server rendering
app.use(serverRender(logger));

// example of handling 404 pages
app.get('*', (req, res) => {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher
app.use((err, req, res) => {
  logger.log('error', 'Error on request %s %s', req.method, req.url);
  logger.log('debug', err.stack);
  res.status(500).send('Server error');
});

app.listen(3000, function(){
	logger.info('Listening on port 3000');
});
