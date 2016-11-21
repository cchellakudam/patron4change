


const User = require('../model').user;

module.exports = {



	getAllUsers: () => {
		return User.findAll();
	},

	getUserByUsername: () => {
	},

	resetPassword: () => {
	},

	changePassword: () => {
	}

};
