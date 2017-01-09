const assert = require('chai').assert;
import chai from 'chai';
const{expect} = chai;
import periodicBackingDAO from '../../../server/data/periodicBackingDAO'
import DBTestUtil from './DBTestUtil'

describe('periodicBackingDAO', () => {
	before( (done) => {
			DBTestUtil.refreshDB().then(() => {
				done();
			});
	})


	describe('create a periodic backing for a changemaker', () => {

		it('should return a singleBacking model on successful creation', (done) =>{
			periodicBackingDAO.createPeriodicBacking(1, 2, 1000, 1463496101).then((res) =>{
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
			periodicBackingDAO.createPeriodicBacking(1, 1,1000, 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('a changemaker cannot back himself!' === err.message);
				done();
			})
		})

		it('user does not exist, exception thrown', (done) =>{
			periodicBackingDAO.createPeriodicBacking(9999, 1,1000, 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('user 9999 does not exist' === err.message);
				done();
			})
		})

		it('changemaker does not exist, exception thrown', (done) =>{
			periodicBackingDAO.createPeriodicBacking(1, 9999, 1000, 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('changemaker 9999 does not exist' === err.message);
				done();
			})
		})

		it('amount is not a number, exception thrown', (done) =>{
			periodicBackingDAO.createPeriodicBacking(1, 2, 'asbd', 1463496101).then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('not a valid amount' === err.message);
				done();
			})
		})

		it('timestamp not valid, exception thrown', (done) =>{
			periodicBackingDAO.createPeriodicBacking(1, 2, 1000, '17/04/1994').then(() => {
				assert.isOk(false, 'no exception was thrown for wrong input');
				done();
			}).catch((err) => {
				assert('not a valid timestamp, UNIX timestamp only please' === err.message);
				done();
			})
		})

	})



});
