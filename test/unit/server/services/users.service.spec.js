import {before, beforeEach, describe, it} from 'mocha';
const assert = require('chai').assert;


describe('userservice', () => {
		before(function (done) {
			const User = require('../../../../server/model').user;
			User.findAll()
				.then((result) => {
					result.forEach((user) => {
						user.destroy();
					})
					User.bulkCreate([
						{firstName: 'Tom', lastName: 'Maddox',
							username: 'tomason', email: 'tom@example.com',
							pwhash: 'sagsdgsdgsdg', role:'patron'},
						{firstName: 'Max', lastName: 'Smith',
							username: 'madMax', email: 'max@example.com',
							pwhash: 'dfndndne4363', role:'patron'}
					])
						.then(() => {
							done()
						})
				})
				.catch((err) => {
					done(err)
				});

		});

		beforeEach(function () {
			this.userService = require('../../../../server/services/users.service');

		});

		it('should return all users', function(done) {

			this.userService.getAllUsers()
				.then((result) => {
					assert.equal(result.length, 2);
					done()
				})
				.catch((err) => {
					done(err)
				})
		});
});
