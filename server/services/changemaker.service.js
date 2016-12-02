export default class {

	static getAllChangemakers() {
		return Promise.resolve([]);
	}

	static getChangemakerByUsername(username) {
		return Promise.resolve({username: username});
	}
}
