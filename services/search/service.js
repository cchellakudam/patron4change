/* eslint no-console: 0 */

import express from 'express';
import config from 'config';

const service = express();
const port = config.get('search').port;

service.get('/', (req, res) => {
  res.sendStatus(204);
});

service.listen(port, () => {
  console.log('Listening on port ' + port);
});
