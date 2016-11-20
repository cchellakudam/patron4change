/* eslint no-console: 0 */

import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import routes from './routes/';

const service = express();
const port = config.get('search').port;

service.use(bodyParser.json());
service.use('/', routes);

service.listen(port, () => {
  console.log('Listening on port ' + port);
});
