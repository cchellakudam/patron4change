import {beforeEach} from 'mocha';
import {before} from 'mocha';
const assert = require('chai').assert;


var models =  require('../../../../server/model');
describe('model', () => {
	describe('backing', () => {
		before(function () {
			return require('../../../../server/model').sequelize.sync({force: true});
		});

		beforeEach(function () {
			models.backing = require('../../../../server/model').backing;
		});

		it('should contain user model', function() {
			assert.isOk(models.backing);
		});

		it('should add a backing inside a user model', function(done) {
			models.user.create({
				firstName: 'tom',
				lastName: 'Miller',
				username: 'tomMiller1',
				email: 'tom@example.com',
				emailConfirmed: false,
				isAnonymous: false,
				isBlocked: false,
				pwhash: '1234556',
				backings: [{
					changemaker: {
						tags: 'I,is,super,awesome',
						videoId: 'www.youtube.com/god',
						isValidated: true,
						user: {
							firstName: 'greg',
							lastName: 'Miller',
							username: 'gergMiller1',
							email: 'greg@example.com',
							emailConfirmed: false,
							isAnonymous: false,
							isBlocked: false,
							pwhash: '7890789'
						},
						mission: {
							text: 'yolo'
						}
					}
				}]
			},{
				include: [
					{
						model: models.backing, 
						as: 'backings',
						include: {model: models.changemaker, as: 'changemaker', include: [{model: models.user, as: 'user'}, {model: models.content, as: 'mission'}]}
					}
				]
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

	});



});
