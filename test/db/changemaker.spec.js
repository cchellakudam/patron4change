import {beforeEach} from 'mocha';
import {before} from 'mocha';
const assert = require('chai').assert;

const models =  require('../../server/model/index');
describe('model', () => {
	describe('changemaker', () => {
		before(function () {
			return require('../../server/model/index').sequelize.sync({force: true});
		});

		beforeEach(function () {
			this.Changemaker = require('../../server/model/index').changemaker;
		});

		it('should contain user model', function() {
			assert.isOk(this.Changemaker);
		});

		it('should add a user model', function(done) {
			models.changemaker.create({
				tags: 'I,is,super,awesome',
				videoId: 'www.youtube.com/god',
				isValidated: true,
				user: {
					firstName: 'tom',
					lastName: 'Miller',
					username: 'tomMiller1',
					email: 'tom@example.com',
					emailConfirmed: false,
					isAnonymous: false,
					isBlocked: false,
					pwhash: '1234556'
				},
				mission: {
					text: 'yolo'
				}
			},{
				include: [ {model: models.user, as: 'user'}, {model: models.content, as: 'mission'} ]
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
			models.changemaker.findAll({ where: { tags: 'I,is,super,awesome'}})
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
