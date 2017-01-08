export default class {

	constructor(dao) {
		this.dao = dao;
	}

	getAllChangemakers() {
		return this.dao.getAllChangemakers();
	}

	getChangemakerById(id) {
		return this.dao.getChangemakerById(id);
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

	createChangemaker(changemaker) {
		return this.dao.createChangemaker(changemaker);
	}
}
