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
		return models.user.findOne({where : {id: id}})
	}

	static getUpdatesByUserId() {
		return models.statusUpdate.findAll();
	}

	static createUser(email){
		return models.user.create({
			email: email
		})
	}

	static updateUser(userInformation){
		return models.user.findOne({where : {id: userInformation.id}}).then((user) =>{
			user.firstName = userInformation.firstName;
			user.lastName = userInformation.lastName;
			user.countryOfResidence = userInformation.countryOfResidence;
			user.birthday = userInformation.birthday
			user.fkCountryIdResidence = userInformation.fkCountryIdResidence;
			user.fkCountryIdNationality = userInformation.fkCountryIdNationality;
			return user.save().then((updatedUser) => {
				return updatedUser
			})
		})
	}

	static getCountries(){
		return models.country.findAll();
	}

}
