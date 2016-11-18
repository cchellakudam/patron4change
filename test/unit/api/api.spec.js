var assert = require('chai').assert;
var http = require('request-promise');

var urlbase = 'http://localhost:3000/api';

describe('api', () => {
	describe('base', () => {
		it('should be present on port 3000 /api', (done) => {
			const request = {
				uri: urlbase,
				resolveWithFullResponse: true
			};

			http(request)
				.then((result) => {
					assert.equal(204, result.statusCode);
					done()
				})
				.catch((err) => {
					done(err)
				})
		})
	});



});

