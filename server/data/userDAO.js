/**
 * Created by ling on 03.12.16.
 */
import models from '../model/index';

export default class{
	static getAllUsers(){
		return Promise.resolve(models.user.findAll());
	}

	static getUserForEmail(email){
		return Promise.resolve(models.user.findOne({where: { email: email }}));
	}

	static getUserForId(id){
		return models.user.findById(id);
	}

	static getUpdatesByUserId() {
		return models.statusUpdate.findAll();
	}

	static createUser(email){
		return models.user.create({
			email: email
		})
	}

	static updateUser(userData){
		return models.user.findById(userData.id).then((user) => {
			user.firstName = userData.firstName;
			user.lastName =userData.lastName;
			user.nationality = userData.nationality;
			user.countryOfResidence = userData.countryOfResidence;
			user.birthday = userData.birthday;
			return user.save()
		})
	}

}
