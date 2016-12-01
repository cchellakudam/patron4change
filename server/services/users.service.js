import dataAccessLayer from '../data';

module.exports = {

	getAllUsers: () => {
		return dataAccessLayer.getAllUsers();
	},

	getUserByUsername: (username) => {
		return Promise.resolve({username: username})
	}

};
