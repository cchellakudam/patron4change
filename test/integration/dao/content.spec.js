import {beforeEach} from 'mocha';
import {before} from 'mocha';
const assert = require('chai').assert;



describe('model', () => {
	describe('content', () => {
		before(function () {
			return require('../../../server/model/index').sequelize.sync({force: true});
		});

		beforeEach(function () {
			this.Content = require('../../../server/model/index').content;
		});

		it('should contain content model', function() {
			assert.isOk(this.Content);
		});

		it('should add a content model', function(done) {
			this.Content.create({
				text: 'this is some weird test content'
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
			this.Content.findAll({ where: { text: 'this is some weird test content'}})
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
