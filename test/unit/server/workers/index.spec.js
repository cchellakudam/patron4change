import config from 'config';
import { assert } from 'chai';
import queue from '../../../../server/utils/queue';

// start workers
require('../../../../server/workers');

describe('Workers', () => {
  it('should have a queue for each entry in config', () => {
    const queueDefs = config.get('queues');
    const queues = [];
    queueDefs.forEach(queueDef => {
      const q = queue(queueDef.name);
      if (undefined !== q) {
        queues.push(q);
      }
    });
    assert.lengthOf(queues, queueDefs.length);
  });

  it('should process tasks', done => {
    const q = queue('updateSearchIndex');
    let taskCount = 0;
    q.push({id: ++taskCount});
    q.push({id: ++taskCount});
    setTimeout(() => {
      assert.equal(q.getStats().total, taskCount);
      q.resetStats();
      done();
    }, 100);
  });

  it('should process duplicate tasks only once', done => {
    const q = queue('updateSearchIndex');
    let taskCount = 0;
    q.push({id: ++taskCount});
    q.push({id: ++taskCount});
    q.push({id: taskCount});
    setTimeout(() => {
      assert.equal(q.getStats().total, taskCount);
      q.resetStats();
      done();
    }, 100);
  });

});
