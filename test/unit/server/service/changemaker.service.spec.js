const assert = require('chai').assert;

import ChangemakerService from '../../../../server/services/changemaker.service';

describe('changemaker service', () => {

	describe('getAllChangemakers()', () => {
		it('should return array', done => {
			function check(result) {
				assert.equal(typeof result, typeof []);
				done();
			}
			ChangemakerService.getAllChangemakers().then(check);
		});
	});

	describe('getChangemakerByUsername()', () => {
		it('should return object', done => {
			function check(result) {
				assert.equal(typeof result, typeof {});
				done();
			}
			ChangemakerService.getChangemakerByUsername('max').then(check);
		});
	});
});
