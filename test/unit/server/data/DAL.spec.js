
const assert = require('chai').assert;



describe('Datalayer interface check', () => {

	describe('Mock Layer should have the functions: ', () => {
		const datalayer = require('../../../../server/data/mockdatalayer');

		it('getAllUsers()', () => {
			assert.isOk('function' === typeof datalayer.getAllUsers);
		});

		it('getUserForEmail()', () => {
			assert.isOk('function' === typeof datalayer.getUserForEmail);
		});

		it('getUserForId()', () => {
			assert.isOk('function' === typeof datalayer.getUserForId);
		});

		it('getAllChangemakers()', () => {
			assert.isOk('function' === typeof datalayer.getAllChangemakers);
		})
	});

	describe('Real Layer should have the functions:', () => {
		const datalayer = require('../../../../server/data/dataAccessLayer');

		it('getAllUsers()', () => {
			assert.isOk('function' === typeof datalayer.getAllUsers);
		});

		it('getUserForEmail()', () => {
			assert.isOk('function' === typeof datalayer.getUserForEmail);
		});

		it('getUserForId()', () => {
			assert.isOk('function' === typeof datalayer.getUserForId);
		});

		it('getAllChangemakers()', () => {
			assert.isOk('function' === typeof datalayer.getAllChangemakers);
		})
	})


});

describe('Mocked dataaccesslayer', () => {
	const datalayer = require('../../../../server/data/mockdatalayer');


	describe('getAllUsers', () => {
		it('should return all users', () => {
			assert.equal(datalayer.getAllUsers().length, 11);
		});
	});

	describe('getUserForEmail', () => {
		it('should return a user for an email', () => {
			const result = datalayer.getUserForEmail('matthias.holzer@example.com');
			assert.equal(result.length, 1);
			assert.equal(result[0].email, 'matthias.holzer@example.com')
		});
	});

	describe('getUserForId', () => {
		it('should return a user for an id', () => {
			const result = datalayer.getUserForId(5);
			assert.equal(result.length, 1);
			assert.equal(result[0].id, '5')
		})
	});

	describe('getAllChangemakers', () => {
		it('should return all changemakers', () => {
			const result = datalayer.getAllChangemakers();
			assert.equal(result.length, 10);
		})
	})
});
