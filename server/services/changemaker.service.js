import dataAccessLayer from '../data';



module.exports = {

	getAllChangemakers: () => {
		return Promise.resolve([]);
	},

	getChangemakerByUsername: (username) => {
		return Promise.resolve({username: username});
	},

	getFeaturedChangemakers: () => {
		return Promise.resolve(dataAccessLayer.getFeaturedChangemakers());
	}


};
