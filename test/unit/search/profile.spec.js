import http from 'request-promise';
import { assert } from 'chai';
import { baseUrl } from './service';

export default () => {

  const testId = '123';

  it('should accept a profile', (done) => {
    http({
      uri: baseUrl + '/profile/genericPerson/' + testId,
      method: 'PUT',
      body: {
        name: 'foo'
      },
      json: true,
      resolveWithFullResponse: true
    })
    .then((result) => {
      assert.equal(result.statusCode, 200);
      done();
    })
    .catch(done);
  });

  it('should delete a profile', (done) => {
    http({
      uri: baseUrl + '/profile/genericPerson/' + testId,
      method: 'DELETE',
      resolveWithFullResponse: true
    })
    .then((result) => {
      assert.equal(result.statusCode, 200);
      done();
    })
    .catch(done);
  });
};
