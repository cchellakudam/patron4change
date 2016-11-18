const assert = require('chai').assert;
const http = require('request-promise');

const urlbase = 'http://localhost:3000/api/changemaker';

describe('/changemaker', () => {
	describe('/', ()=>{
		it('path / should return an array', (done) => {
			http(urlbase + '/')
				.then((res) => {
					const body = JSON.parse(res);
					assert.equal(typeof [], typeof body);
					done();
				})
				.catch((err) => {
					done(err);
				})
		});
	});

	describe('/:username', () => {
		it('should return object, if existing', (done) => {
			http(urlbase + '/maxmuster')
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
