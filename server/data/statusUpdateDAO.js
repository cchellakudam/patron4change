import models from '../model/index';
export default class {

	static getUpdatesByUserId() {
		return models.statusUpdate.findAll();
	}

}
