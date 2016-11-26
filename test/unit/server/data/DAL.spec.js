
const assert = require('chai').assert;



describe('Datalayer interface check', () => {

	describe('Mock Layer should have the functions: ', () => {
		const datalayer = require('../../../../server/data/mockDataLayer');

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
	const datalayer = require('../../../../server/data/mockDataLayer');


	describe('getAllUsers', () => {
		it('should return all users', done => {
			function check(result) {
				assert.equal(result.length, 11);
				done();
			}
			datalayer.getAllUsers().then(check);
		});
	});

	describe('getUserForEmail', () => {
		it('should return a user for an email', done => {
			function check(result) {
				assert.equal(result.length, 1);
				assert.equal(result[0].email, 'matthias.holzer@example.com')
				done();
			}
			datalayer.getUserForEmail('matthias.holzer@example.com').then(check);
		});
	});

	describe('getUserForId', () => {
		it('should return a user for an id', done => {
			function check(result) {
				assert.equal(result.length, 1);
				assert.equal(result[0].id, '5')
				done();
			}
			datalayer.getUserForId(5).then(check);
		});
	});

	describe('getAllChangemakers', () => {
		it('should return all changemakers', done => {
			function check(result) {
				assert.equal(result.length, 10);
				done();
			}
			datalayer.getAllChangemakers().then(check);
		})
	})
});
