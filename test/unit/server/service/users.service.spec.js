const assert = require('chai').assert;


describe('users service', () => {

	const usersService = require('../../../../server/services/users.service');

	describe('getAllUsers', () => {
		it('should return all users', done => {
			function check(result) {
				assert.equal(result.length, 11);
				done();
			}
			usersService.getAllUsers().then(check);
		});
	});

	describe('getUserByUsername', () => {
		it('should return object', done => {
			function check(result) {
				assert.equal(typeof result, typeof {});
				done();
			}
			usersService.getUserByUsername('max').then(check);
		});

		it('should contain attribute with username', done => {
			function check(result) {
				assert.equal(result.username, 'max');
				done();
			}
			usersService.getUserByUsername('max').then(check);
		});
	});

});
