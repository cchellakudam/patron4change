const assert = require('chai').assert;
import paymentDAO from '../../../server/data/paymentDAO'
import DBTestUtil from './DBTestUtil'

describe('paymentDAO', () => {
	before(() => {
		return DBTestUtil.refreshDB();
	})
	describe('register a changemaker to a payment provider', () =>{

		it('should return a paymentServiceData model upon successful creation', (done) =>{
			paymentDAO.registerChangemakerToProvider(1,1,'1').then((res) => {
				assert(1 === res.fkChangemakerId,
						`changemakerId is supposed to be 1, but it is actually: ${res.fkChangemakerId}`);
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

	describe('create a single backing for a changemaker', () => {

		it('should return a singleBacking model on successful creation', (done) =>{
			paymentDAO.createSingleBacking(1, 2, 'abc', 1000, 1463496101).then((res) =>{
				assert(1000 === res.backing.amount, 'the backing amount does not match the input');
				assert(1000 === res.backing.payments[0].amount, 'the payment amount does not match input');
				// assert(res.backing.payments[0].transactionDate === 1463496101, 'the payment date does not match input');
				assert('abc' === res.backing.payments[0].transactionId, 'the payment transactionId does not match input');
				done();
			}).catch((err) =>{
				done(err);
			})
		})

		it('userId = changemakerId, exception thrown', (done) =>{
			paymentDAO.createSingleBacking(1, 1, 'abc', 1000, 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('a changemaker cannot back himself!' === err.message);
				done();
			})
		})

		it('user does not exist, exception thrown', (done) =>{
			paymentDAO.createSingleBacking(9999, 1, 'abc', 1000, 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('user 9999 does not exist' === err.message);
				done();
			})
		})

		it('changemaker does not exist, exception thrown', (done) =>{
			paymentDAO.createSingleBacking(1, 9999, 'abc', 1000, 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('changemaker 9999 does not exist' === err.message);
				done();
			})
		})

		it('amount is not a number, exception thrown', (done) =>{
			paymentDAO.createSingleBacking(1, 2, 'abc', 'asbd', 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('not a valid amount' === err.message);
				done();
			})
		})

		it('timestamp not valid, exception thrown', (done) =>{
			paymentDAO.createSingleBacking(1, 2, 'abc', 1000, '17/04/1994').then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('not a valid timestamp, UNIX timestamp only please' === err.message);
				done();
			})
		})

	})

});
