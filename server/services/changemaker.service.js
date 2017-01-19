export default class {

	constructor(dao, backingDAO) {
		this.dao = dao;
		this.backingDAO = backingDAO;
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

	getBackingsByChangemakerId(id) {
		return this.backingDAO.getByChangemakerId(id);
	}

	getUpdatesByUserId(){
		return Promise.resolve([]);
	}

	createChangemaker(changemaker) {
		changemaker.isApproved = false;
		return this.dao.createChangemaker(changemaker);
	}
}
