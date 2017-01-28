export default class {

	constructor(dao) {
		this.dao = dao;
	}

	checkUserData(user){
		if(!user.firstName){
			return false;
		}
		if(!user.lastName){
			return false;
		}
		if(!user.birthday){
			return false;
		}
		if(!user.nationality){
			return false;
		}
		if(!user.countryOfResidence){
			return false;
		}

		return true;
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
			let myUser = {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				birthday: user.birthday,
				email: user.email,
				nationality: user.nationality,
				countryOfResidence: user.countryOfResidence,
			}
			if(!this.checkUserData(myUser)){
				myUser.incorrectData = true;
			}
			return myUser;
		})
	}

	updateUser(userData) {
		return this.dao.updateUser(userData).then((user) => {
			let myUser = {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				birthday: user.birthday,
				email: user.email,
				nationality: user.nationality,
				countryOfResidence: user.countryOfResidence,
			}
			if(!this.checkUserData(myUser)){
				myUser.incorrectData = true;
			}
			return myUser;
		});
	}

}
