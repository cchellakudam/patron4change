const assert = require('chai').assert;
import userDAO from '../../../server/data/userDAO'
import DBTestUtil from './DBTestUtil'

describe('userDAO', () => {
	before( (done) => {
			DBTestUtil.refreshDB().then(() => {
				done();
			});
	})
	describe('get all users from the database', () =>{

		it('The number of returned users should equal to the number of test users', (done) =>{
			userDAO.getAllUsers().then(users => {
				assert.isArray(users);
				assert.equal(users.length, 11);
				done();
			})
			.catch((err) => {
				done(err);
			});
		});

		it('Each of the uses returned should be unique i.e. no duplicates', (done) => {
			userDAO.getAllUsers().then(users => {
					let userDictionary = {};
					assert.isArray(users);
					for(let i = 0; i < users.length; i ++){
							assert(!userDictionary.hasOwnProperty(users[i].id.toString()), 'There is a duplicated user !');
							userDictionary[users[i].id.toString()] = 1;
					}
					done();
			})
			.catch((err) => {
				done(err);
			});
		});
	});
});
