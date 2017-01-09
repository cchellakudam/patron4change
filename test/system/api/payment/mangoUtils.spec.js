const assert = require('chai').assert;
import mangoUtils from '../../../../server/services/payments/mangoUtils'

describe('mangopay API specific logic', () => {
	describe('createNaturalUser', () => {
		it('thiis service call should return a mango user Id',(done) => {
			let userObject = {
				firstName: 'Tom',
				lastName: 'Walker',
				birthday: 1320969600,
				nationality: 'GB',
				countryOfResidence: 'GB',
				email: 'tom@mail.test.com',
				userId: 1
			}

			mangoUtils.createNaturalUser(userObject).then((res) => {
			assert(res, 'the returned value was not valid');
			done();
			}).
			catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it('this service should create a wallet and return its Id', (done) =>{
			mangoUtils.createWallet('18559606', 1).then((res) => {
				assert(res, 'the returned value was not valid');
				done();
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it('this service should retrieve the walletId of a user given the user Id', (done) => {
			mangoUtils.getUserWallet('18559606').then((res) => {
				assert(res, 'the returned value was not valid');
				done()
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it('this service should create a backing and payment for a changemaker ' +
			'using mangopay, a redirect url should be given', (done) => {
			mangoUtils.createCardPayment('18559606', 1000, 1, 2).then((res) => {
				assert(res.startsWith('https'), 'the returned value was not valid');
				done();
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000)

	})

	describe('getPreCardRegistrationData', () => {
		it('this service call shoud get card pre registration data from mangopay API server for a specific user', (done) => {
			mangoUtils.preRegisterCard('18559606').then((res) => {
				assert(res, 'the returned value: ' + res + 'is not valid');
				done();
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000)
	})

	describe('entire card registration process with mangopay', () => {
		it('should complete the card registration service for a test card provided by mangoPay', (done) => {
			mangoUtils.preRegisterCard('18559606').then((preRegistrationData) => {
				done()
			}).catch((err) => {done(err);})
		}).timeout(10000)
	})

})
