export default class {

	constructor(dao) {
		this.dao = dao;
	}

	getAllChangemakers() {
		return this.dao.getAll();
	}

	getChangemakerById(id) {
		return this.dao.getChangemakerById(id);
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

	createChangemaker(changemaker) {
		return this.dao.createChangemaker(changemaker);
	}
}
