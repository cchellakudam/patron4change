import {before} from 'mocha';
const assert = require('chai').assert;

const models = require('../../../server/model/index');
describe('model', () => {
	describe('roleUser', () => {
		before(function () {
			return require('../../../server/model/index').sequelize.sync({force: true});
		});


		it('should contain roleUser model', function() {
			assert.isOk(models.roleUser);
		});

		it('should add a roleUser model', function(done) {
			models.roleUser.create({
				role: {
					roleName: 'God'
				},
				user: {
					firstName: 'tom',
					lastName: 'Miller',
					username: 'tomMiller1',
					email: 'tom@example.com',
					emailConfirmed: false,
					isAnonymous: false,
					isBlocked: false,
					pwhash: '1234556'
				}
			}, {
				include: [{model: models.role, as: 'role'}, {model: models.user, as: 'user'}]
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

		it('should find the roleUser', function(done) {
			models.roleUser.findAll({
				include: [{
					model: models.role,
					as: 'role',
					where: {roleName: 'God'}
				}]
			})
				.then((result) => {
					assert.isOk(result);
					done()
				})
				.catch((err) => {
					done(err)
				})
		})
	});



});
