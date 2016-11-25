import {beforeEach} from 'mocha';
import {before} from 'mocha';
const assert = require('chai').assert;



describe('model', () => {
	describe('user', () => {
		before(function () {
			return require('../../server/model/index').sequelize.sync();
		});

		beforeEach(function () {
			this.User = require('../../server/model/index').user;
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
				pwhash: 'ASGSG$#H#%H$#Hdh3h3h',
				role: 'patron'
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
			this.User.findOne({ where: { username: 'tomMiller1'}})
				.then((user) => {

						user.destroy()
							.then(() => {
								done()
							})

				})
				.catch((err) => {
					done(err)
				})
		})
	});



});
