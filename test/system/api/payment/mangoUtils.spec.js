const assert = require('chai').assert;
const http = require('request-promise');
import mangoUtils from '../../../../server/services/payments/mangoUtils'

describe('mangopay API specific logic', () => {
	describe('createNaturalUser', () => {
		it('thie service call should return a mango user Id',(done) => {
			let userObject = {
				firstName: 'Tom',
				lastName: 'Walker',
				birthday: 1320969600,
				nationality: 'GB',
				countryOfResidence: 'GB',
				email: 'tom@mail.test.com'
			}

			mangoUtils.createNaturalUser(userObject).then((res) => {
			console.log(res);
			assert(res, 'the returned value was not valid');
			done();
			}).
			catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it('this service should create a wallet and return its Id', (done) =>{
			mangoUtils.createWallet(18559606, 1).then((res) => {
				assert(res, 'the returned value was not valid');
				done();
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it('this service should retrieve the walletId of a user given the user Id', (done) => {
			mangoUtils.getUserWallet(18559606).then((res) => {
				assert(res, 'the returned value was not valid');
				done()
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it('this service should create a backing and payment for a changemaker using mangopay', (done) => {
			mangoUtils.createCardPayment(18559606, 1000).then((res) => {
				assert(res, 'the returned value was not valid');
				done();
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000)

	})
})
