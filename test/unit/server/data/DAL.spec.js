const assert = require('chai').assert;
import mockDataLayer from '../../../../server/data/mockDataLayer';
import dataLayer from '../../../../server/data/dataAccessLayer';

describe('Datalayer interface check', () => {

	describe('Mock Layer should have the functions: ', () => {

		it('getAllUsers()', () => {
			assert.isOk('function' === typeof mockDataLayer.getAllUsers);
		});

		it('getUserForEmail()', () => {
			assert.isOk('function' === typeof mockDataLayer.getUserForEmail);
		});

		it('getUserForId()', () => {
			assert.isOk('function' === typeof mockDataLayer.getUserForId);
		});

		it('getAllChangemakers()', () => {
			assert.isOk('function' === typeof mockDataLayer.getAllChangemakers);
		})

		it('getFeaturedChangemakers()', () => {
			assert.isOk('function' === typeof mockDataLayer.getFeaturedChangemakers);
		})
	});

	describe('Real Layer should have the functions:', () => {

		it('getAllUsers()', () => {
			assert.isOk('function' === typeof dataLayer.getAllUsers);
		});

		it('getUserForEmail()', () => {
			assert.isOk('function' === typeof dataLayer.getUserForEmail);
		});

		it('getUserForId()', () => {
			assert.isOk('function' === typeof dataLayer.getUserForId);
		});

		it('getAllChangemakers()', () => {
			assert.isOk('function' === typeof dataLayer.getAllChangemakers);
		})

		it('getFeaturedChangemakers()', () => {
			assert.isOk('function' === typeof dataLayer.getFeaturedChangemakers);
		})

	})

});
