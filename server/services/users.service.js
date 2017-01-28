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

	loginUser(email){
		return this.dao.getUserForEmail(email).then((user) => {
			if(null === user){
				return this.dao.createUser(email)
			}else{
				return Promise.resolve(user)
			}
		}).then((user) => {
			return user;
		})
	}

	updateUser(userData) {
		return this.dao.updateUser(userData);
	}


}
