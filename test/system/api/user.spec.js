/* const assert = require('chai').assert;
const http = require('request-promise');

const urlbase = 'http://localhost:3000/api/user';

describe('/user', () => {

	describe('/:id', () => {
		it('should return only one result and the id must match', (done) => {
			http(urlbase + '/1')
				.then((res)=>{
					assert.isOk(res.id === 1);
					//assert.isOk(res.id === 1);
					done()
				})
				.catch((err)=> {
					done(err);
				})
		})
	})

});
*/
