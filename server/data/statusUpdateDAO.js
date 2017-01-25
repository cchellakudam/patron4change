import models from '../model/index';

export default class {

	static getUpdatesByChangemakerId(fkChangemakerId) {
		return models.statusUpdate.findAll({
			where: { fkChangemakerId }
		});
	}

}
