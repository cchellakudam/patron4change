const assert = require('chai').assert;
const pgp = require('pg-promise')();



function getConfig(){
	const config = {
		user: 'pgadmin',
		database: 'patron4change',
		password: 'asdfasdf',
		host: 'localhost',
		port: 5432
	};

	return config;
}


describe('database', () => {
	describe('basicSetup', () => {
		it('database should exist', () => {
			const db = pgp(getConfig());
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
