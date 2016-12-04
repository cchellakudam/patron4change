const assert = require('chai').assert;
import mockDataLayer from '../../../../server/data/mockDataLayer';
import changemakerDao from '../../../../server/data/changemakerDAO';
import userDAO from '../../../../server/data/userDAO';

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
			assert.isOk('function' === typeof userDAO.getAllUsers);
		});

		it('getUserForEmail()', () => {
			assert.isOk('function' === typeof userDAO.getUserForEmail);
		});

		it('getUserForId()', () => {
			assert.isOk('function' === typeof userDAO.getUserForId);
		});

		it('getAllChangemakers()', () => {
			assert.isOk('function' === typeof changemakerDao.getAllChangemakers);
		})

		it('getFeaturedChangemakers()', () => {
			assert.isOk('function' === typeof changemakerDao.getFeaturedChangemakers);
		})

	})

});
