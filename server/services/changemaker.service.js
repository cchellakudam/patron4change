import dataAccessLayer from '../data';
export default class {

	static getAllChangemakers() {
		return Promise.resolve([]);
	}

	static getChangemakerByUsername(username) {
		return Promise.resolve({username: username});
	}

	static getFeaturedChangemakers(){
		return Promise.resolve(dataAccessLayer.getFeaturedChangemakers())
	}
}
