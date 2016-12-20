const assert = require('chai').assert;
const http = require('request-promise');

const urlbase = 'http://localhost:3000/api/search';

describe('/search', () => {

	it('should search and return relevance data', (done) => {
		const request = {
			uri: urlbase + '?q=Marcel',
			resolveWithFullResponse: true
		};

		http(request)
			.then((result) => {
				assert.equal(200, result.statusCode);
				done()
			})
			.catch((err) => {
				done(err)
			})
	})
});
