export default class {

	constructor(dao) {
		this.dao = dao;
	}

	getAllChangemakers() {
		return this.dao.getAllChangemakers();
	}

	getChangemakerByUsername(username) {
		return this.dao.getChangemakerByUsername(username);
	}

	getFeaturedChangemakers(){
		return this.dao.getFeaturedChangemakers();
	}

	getUpdatesByUserId(){
		return Promise.resolve([]);
	}
}
