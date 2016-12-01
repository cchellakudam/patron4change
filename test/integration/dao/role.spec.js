import {beforeEach} from 'mocha';
import {before} from 'mocha';
const assert = require('chai').assert;



describe('model', () => {
	describe('role', () => {
		before(function () {
			return require('../../../server/model/index').sequelize.sync({force: true});
		});

		beforeEach(function () {
			this.Role = require('../../../server/model/index').role;
		});

		it('should contain user model', function() {
			assert.isOk(this.Role);
		});

		it('should add a role model', function(done) {
			this.Role.create({
				roleName: 'God'
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
			this.Role.findAll({ where: { roleName: 'God'}})
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
