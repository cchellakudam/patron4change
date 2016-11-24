import http from 'request-promise';
import { assert } from 'chai';
import { baseUrl } from './service';

// TODO Remove as soon as the index is defined globally
import elastic from '../../../services/search/elastic';

export default () => {

  const words = [
    'amalgamable',
    'amaxophobia',
    'amazing',
    'ambiguous',
    'amplification',
    'barricading'
  ];

  const index = 'profile';
  const type = 'completionTest';
  const urlPath = '/' + index + '/' + type + '/';
  const ids = [];

  before((done) => {
    // TODO Remove as soon as the index is defined globally
    elastic.indices.putMapping({
      index: index,
      type: type,
      body: {
        [type]: {
          properties: {
            suggest: {
              type: 'completion'
            }
          }
        }
      }
    })
    .then(() => done())
    .catch(done);
  });

  before((done) => {
    let id = 1;
    Promise.all(words.map((word) => {
      ids.push(id);
      return http({
        uri: baseUrl + urlPath + id++,
        method: 'PUT',
        body: {
          suggest: word
        },
        json: true,
      });
    }))
    .then(() => {
      // There is a latency until new entries becomes searchable
      setTimeout(done, 1000);
    })
    .catch(done);
  });

  after(() => {
    ids.forEach((id) => {
      return http({
        uri: baseUrl + urlPath + id,
        method: 'DELETE'
      });
    });
  });

  let prefixes = new Map();
  words.forEach((word) => {
    for (let i = 1; 3 >= i; i++) {
      const prefix = word.substr(0, i);
      prefixes.set(prefix, prefixes.get(prefix) || []);
      prefixes.get(prefix).push(word);
    }
  });

  it('should have terms for completion', (done) => {
    assert.isAbove(prefixes.size, 0);
    done();
  });

  prefixes.forEach((words, prefix) => {
    it('should return completions for: ' + prefix, (done) => {
      http({
        uri: baseUrl + '/suggest/completionTest',
        qs: {
          q: prefix
        },
        method: 'GET',
        json: true
      })
      .then((result) => {
        assert.deepEqual(result, words);
        done();
      })
      .catch(done);
    });
  });

};
