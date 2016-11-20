const assert = require('chai').assert;
const http = require('request-promise');
const config = require('config');

const port = config.get('search').port;
const urlbase = 'http://localhost:' + port;

describe('Search Service', () => {
  it('should respond to /', (done) => {
    http({
      uri: urlbase + '/',
      resolveWithFullResponse: true
    })
    .then((result) => {
      assert.equal(result.statusCode, 204);
      done();
    })
    .catch(done);
  });
});
