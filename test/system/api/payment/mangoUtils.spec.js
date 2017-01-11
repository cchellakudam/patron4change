const assert = require('chai').assert;
import mangoUtils from '../../../../server/services/payments/mangoUtils'
import DBTestUtil from '../../../integration/dao/DBTestUtil'
import models from '../../../../server/model/index'

describe('mangopay API specific logic', () => {
	before( (done) => {
		DBTestUtil.refreshDB().then(() => {
			done();
		});
	})

	describe('createNaturalUser', () => {
		it.only('thiis service call should return a mango user Id',(done) => {
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

		it.only('this service should create a wallet and return its Id', (done) =>{
			mangoUtils.createWallet('18559606', 1).then((res) => {
				assert(res, 'the returned value was not valid');
				done();
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it.only('this service should retrieve the walletId of a user given the user Id', (done) => {
			mangoUtils.getUserWallet('18559606').then((res) => {
				assert(res, 'the returned value was not valid');
				done()
			}).catch((err) => {
				done(err);
			})
		}).timeout(10000);

		it.only('this service should create a backing and payment for a changemaker ' +
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
		it.only('this service call shoud get card pre registration data from mangopay API server for a specific user', (done) => {
		let patronAccount = models.paymentServiceData.create({
			accountId: '19767179',
			fkChangemakerId: 2,
			fkPaymentProviderId: 1
		}).then((res) => {
				mangoUtils.preRegisterCard('19767179').then((res) => {
				assert(res, 'the returned value: ' + res + 'is not valid');
				done();
				}).catch((err) => {
					done(err);
				})
			}).catch((err) => {console.log(err)})

		}).timeout(10000)
	})

	describe('entire card registration process with mangopay', () => {
		it('should complete the card registration service for a test card provided by mangoPay', (done) => {
		let changemaker = models.paymentServiceData.create({
				accountId: '19767341',
				fkChangemakerId: 3,
				fkPaymentProviderId: 1
			}).then((res) => {return res})

		let patron = models.paymentServiceData.create({
			accountId: '19765947',
			fkChangemakerId:4,
			fkPaymentProviderId: 1
		}).then((res) => {return res})

		Promise.all([patron, changemaker]).then(values => {
			mangoUtils.preRegisterCard(patron.accountId).then((preRegistrationData) => {
				console.log(preRegistrationData);
				done();
			})
		})

		}).timeout(10000)
	})

})
