export default {

	getAllChangemakers: () => {
		return Promise.resolve([]);
	},

	getChangemakerByUsername: (username) => {
		return Promise.resolve({username: username});
	}

};
