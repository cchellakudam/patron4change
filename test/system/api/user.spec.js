const assert = require('chai').assert;
const http = require('request-promise');

const urlbase = 'http://localhost:3000/api/user';

describe('/user', () => {

	describe('/:id', () => {
		it('should return object, if existing', (done) => {
			http(urlbase + '/1')
				.then((res)=>{
					const body = JSON.parse(res);
					assert.typeOf(body, 'object');
					done()
				})
				.catch((err)=> {
					done(err);
				})
		})
	})

});
