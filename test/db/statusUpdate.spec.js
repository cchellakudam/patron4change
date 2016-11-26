import {before} from 'mocha';
const assert = require('chai').assert;

const models =  require('../../server/model/index');
describe('model', () => {
	describe('statusUpdate', () => {
		before(function () {
			return require('../../server/model/index').sequelize.sync({force: true});
		});


		it('should contain statusUpdate model', function() {
			assert.isOk(models.statusUpdate);
		});

		it('should add a statsUpdate model WITHIN a changemaker', function(done) {
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
						text: 'mission yolo'
					},
					statusUpdates: [{
						title: 'yolo',
						content: {text: 'content yolo'}
					}]
				},{
					include: [
						{model: models.user, as: 'user'},
						{model: models.content, as: 'mission'},
						{model: models.statusUpdate, as: 'statusUpdates', include: [{model: models.content, as: 'content'}]}
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

/*		it('should find the statsUpdate', function(done) {
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
		})*/
	});



});
