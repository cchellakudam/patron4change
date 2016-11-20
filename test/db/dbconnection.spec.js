const assert = require('chai').assert;
const pgp = require('pg-promise')();
const config = require('config');

describe('database', () => {
	describe('basicSetup', () => {
		it('database should exist', () => {
			const db = pgp(config.get('database'));
			return db.any({
				text: 'SELECT * from pg_database WHERE datname=$1',
				values: 'patron4change'
			})
				.then((data) => {
					assert.equal(data.length, 1);
				})
				.catch((error) => {
					assert.isNotOk(error, 'db connection error');
				})
		})



	})

});
