/**
 * Created by ling on 03.12.16.
 */
import models from '../model/index';

export default class{
	static getAllUsers(){
		return Promise.resolve(models.users.findAll());
	}

	static getUserForEmail(email){
		return Promise.resolve(models.users.findAll({where: { email: email }}));
	}

	static getUserForId(id){
		return models.user.findById(id);
	}

	static getUpdatesByUserId() {
		return models.statusUpdate.findAll();
	}
}
