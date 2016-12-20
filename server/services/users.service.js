export default class {

	constructor(dao) {
		this.dao = dao;
	}

	getAllUsers() {
		return this.dao.getAllUsers();
	}

	getUserByUsername(username) {
		return this.dao.getUserByUsername(username);
	}

	getUserForId(id) {
		return this.dao.getUserForId(id);
	}

}
