const assert = require('chai').assert;


describe('users service', () => {

	const usersService = require('../../../../server/services/users.service');

	describe('getAllUsers', () => {
		it('should return all users', () => {
			assert.equal(usersService.getAllUsers().length, 11);
		})


	});

});
