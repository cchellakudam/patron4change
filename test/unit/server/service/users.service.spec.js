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

});
