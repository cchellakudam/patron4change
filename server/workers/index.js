import config from 'config';
import queue from '../utils/queue';

config.get('queues').forEach(queueDef => {
  const fn = require('./' + queueDef.name);
  queue(queueDef.name, queueDef.config, fn);
});
