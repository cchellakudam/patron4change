const assert = require('chai').assert;


describe('patron service', () => {

	const patronService = require('../../../../server/services/patron.service');

	describe('getAllPatrons()', () => {
		it('should return array', done => {
			function check(result) {
				assert.equal(typeof result, typeof []);
				done();
			}
			patronService.getAllPatrons().then(check);
		});
	});


});
