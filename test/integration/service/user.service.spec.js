import userService from '../../../server/services/users.service'
import DBTestUtil from '../dao/DBTestUtil'
import { expect } from 'chai';
import userDAO from '../../../server/data/userDAO'

describe('user service', () => {
	before( (done) => {
		DBTestUtil.refreshDB().then(() => {
			done();
		});
	})
	describe('check if logged user exists, if not then create a new user', () =>{

		it.only('should return an existing user in the database with all user data', () =>{
			let service = new userService(userDAO);
			return service.loginUser('matthias.holzer@example.com').then((user) => {
				expect(user.email).to.equal('matthias.holzer@example.com')
				expect(user.firstName).to.equal('Matthias')
				expect(user.lastName).to.equal('Holzer')
				expect(user.id).to.equal(1)
			})
		});

		it.only('should return a newly created user with only email info', () => {
			let service = new userService(userDAO);
			return service.loginUser('rebecca.keuler@example.com').then((user) => {
				expect(user.email).to.equal('rebecca.keuler@example.com')
				expect(user.firstName).to.equal(null)
				expect(user.lastName).to.equal(null)
			})
		});
	});
});
