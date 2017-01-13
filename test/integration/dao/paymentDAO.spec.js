const assert = require('chai').assert;
import chai from 'chai';
const{expect} = chai;
import paymentDAO from '../../../server/data/paymentDAO'
import DBTestUtil from './DBTestUtil'

describe('paymentDAO', () => {
	before( (done) => {
			DBTestUtil.refreshDB().then(() => {
				done();
			});
	})
	describe('register a changemaker to a payment provider', () =>{

		it('should return a paymentServiceData model upon successful creation', (done) =>{
			paymentDAO.registerChangemakerToProvider(1,1,'1').then((res) => {
				assert(1 === res.fkUserId,
						`changemakerId is supposed to be 1, but it is actually: ${res.fkUserId}`);
				assert( 1 === res.fkPaymentProviderId,
						`paymentProviderId is supposed to be 1, but it is actually, ${res.fkPaymentProviderId}`);
				assert( '1' ===  res.accountId,
						`accountId is supposed to be 1, but it is actually ${res.accountId}`);
				done();
			})
			.catch((err) => {
				done(err);
			})
		});

		it('changemakerId that doesn\'t exist, should throw error', (done) => {
			paymentDAO.registerChangemakerToProvider(9999, 9999, '2').then(() => {
					assert.isOk(false, 'no exception was thrown for wrong input')
					done();
			}).catch((err) => {
				assert('changemaker 9999 does not exist' === err.message);
				done();
			})
		})

		it('paymentProviderId doesn\'t exist, should throw error', (done) => {
			paymentDAO.registerChangemakerToProvider(1, 9999, '2').then(()=>{

				assert.isOk(false,'no exception was thrown for wrong input')
				done();
			}).catch((err) => {
				assert('provider 9999 does not exist' === err.message)
				done();
			})
		})

	});


	describe('get a changemaker payment provider account', () => {
		it('return the account Id from previous test case, where it was created', (done) =>{
			paymentDAO.getAccountIdForUser(1, 1).then((res) => {
				assert('1' === res, 'accountId is incorrect expected value is 1, actual value is:' + res);
				done();
			}).catch((err) => {
				done(err);
			})
		})

		it('querying an changemaker payment provider account which does not exist', (done) => {
			paymentDAO.getAccountIdForUser(1, 9999).then((res) => {
				assert('undefined' === res, 'the accountId is incorrect expected value is undefined, actual value is:' +res)
				done();
			}).catch(() => {
				done();
			})
		})
	})

	describe('add a card registration to a payment account', () => {
		it('add card registration data', (done) => {
			paymentDAO.setCardRegistrationForAccount('1', 1, 'abcd123')
				.then((res) => {
					expect(res).to.be.true;
					done();
				}).catch((err) => {
					done(err);
				})
		})


		it('account does not exist - throw error', (done) => {
			paymentDAO.setCardRegistrationForAccount('dsff', 1,'abcd123')
			.then(() => {
					assert.isOk(false, 'An error should be thrown');
			}).catch((err) => {
					expect(err.message).to.equal('no account has been found for dsff');
					done()
			})
		})
	})

	describe('get card registration data', () => {
		it('get previous card registration data', (done) => {
			paymentDAO.getCardRegistrationForAccount('1',1).then((res) => {
				expect(res).to.equal('abcd123');
				done();
			})
		})
	})

	describe('create a payment', () => {
		it('create a new payment from an existing backing', (done) => {
			paymentDAO.createPayment(1000, 1483903845, 'abc', 1).then((res) => {
				expect(res.amount).to.equal(1000);
				expect(new Date(res.transactionDate).getTime()).to.equal(1483903845);
				expect(res.transactionId).to.equal('abc');
				expect(res.fkBackingId).to.equal(1);
				done();
			}).catch((err) => {
				done(err);
			})
		})
	})

	describe('get card registration for a user', () => {
		it('get a card registration for a user previously set', (done) => {
			paymentDAO.getCardRegistrationForUser('1', 1).then((res) => {
				expect(res).to.equal('abcd123');
				done();
			}).catch((err) => {
				done(err)
			})
		})
	})
});
