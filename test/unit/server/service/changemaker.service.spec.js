const assert = require('chai').assert;


describe('changemaker service', () => {

	const changemakerService = require('../../../../server/services/changemaker.service');

	describe('getAllChangemakers()', () => {
		it('should return array', done => {
			function check(result) {
				assert.equal(typeof result, typeof []);
				done();
			}
			changemakerService.getAllChangemakers().then(check);
		});
	});

	describe('getChangemakerByUsername()', () => {
		it('should return object', done => {
			function check(result) {
				assert.equal(typeof result, typeof {});
				done();
			}
			changemakerService.getChangemakerByUsername('max').then(check);
		});
	});
});
