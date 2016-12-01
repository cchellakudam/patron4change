/* eslint no-console: 0 */

import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import routes from './routes/';
import setup from './setup';

const service = express();
const port = config.get('search').port;

service.use(bodyParser.json());
service.use('/', routes);

setup()
.then(() => {
  service.listen(port, () => {
    console.log('Listening on port ' + port);
  });
})
.catch(console.error);
