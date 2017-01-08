export default class {

	constructor(dao) {
		this.dao = dao;
	}

	getAllChangemakers() {
		return this.dao.getAll();
	}

	getChangemakerById(id) {
		return this.dao.getById(id);
	}

	getChangemakerByUsername(username) {
		return this.dao.getByUsername(username);
	}

	getFeaturedChangemakers() {
		return this.dao.getFeatured();
	}

	getUpdatesByUserId(){
		return Promise.resolve([]);
	}
}
