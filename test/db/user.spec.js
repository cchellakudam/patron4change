import {beforeEach} from 'mocha';
import {before} from 'mocha';
import _ from 'lodash';
const assert = require('chai').assert;



describe('model', () => {
	describe('user', () => {
		before(function () {
			return require('../../server/model').sequelize.sync({force: true});
		});

		beforeEach(function () {
			this.User = require('../../server/model').user;
		});

		it('should contain user model', function() {
			assert.isOk(this.User);
		});

		it('should add a user model', function(done) {
			this.User.create({
			firstName: 'tom',
				lastName: 'Miller',
				username: 'tomMiller1',
				email: 'tom@example.com',
				emailConfirmed: false,
				isAnonymous: false,
				isBlocked: false,
				pwhash: '1234556'
			})
				.bind(this)
				.then((result) => {
					assert.isOk(result);
					done()
				})
				.catch((err) => {
					done(err)
				})
		})

		it('should find the created user', function(done) {
			this.User.findAll({ where: { username: 'tomMiller1'}})
				.then((result) => {
					assert.isOk(result);
					done()
				})
				.catch((err) => {
					done(err)
				})
		});

		it('should delete the user', function(done) {

			function success(user) {
				user.destroy().then(_.partial(done, null));
			}

			this.User.findOne({ where: { username: 'tomMiller1'}})
				.then(success)
				.catch(done);
		})
	});



});
