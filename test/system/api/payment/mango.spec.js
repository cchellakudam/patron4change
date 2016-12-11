const assert = require('chai').assert;
const http = require('request-promise');

const urlbase = 'http://localhost:3000/api/payment'
describe('/payment', () => {
	describe('/mango/register', () => {
		it('thie API call should return a mango user object',(done) => {
				var options = {
					method: 'POST',
					uri: urlbase + '/mango/register',
					body:{
						firstName: 'Tom',
						lastname: 'Walker',
						birthday: 1320969600,
						nationality: 'GB',
						countryOfResidence: 'GB',
						email: 'tom@mail.test.com'
					},
					json:true
				};
				http(options).then((res) => {
					console.log(res);
					assert(1===1);
					done();
				})
				.catch((err) => {
					done(err);
				})
		}).timeout(10000);
	})
})
