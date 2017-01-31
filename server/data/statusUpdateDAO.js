import models from '../model/index';

export default class {

	static getUpdatesByChangemakerId(fkChangemakerId) {
		return models.statusUpdate.findAll({
			where: { fkChangemakerId },
			order: [['createdAt', 'DESC']]
		});
	}

	static create(fkChangemakerId, text) {
		return models.statusUpdate.create({
			createdAt: +new Date(),
			title: 'Some title',
			fkChangemakerId,
			content: { text }
		}, {
			include: [{
		    association: models.statusUpdate.content
		  }]
		}).then( update => {
			return update.id;
		});
	}

}
