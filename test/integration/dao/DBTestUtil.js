import models from '../../../server/model/index';
import { testInsert } from './testInsert';

export default class {

	static refreshDB() {
		const logging = false;
		return models.sequelize.sync({
			force: true,
			logging
		}).then(() => testInsert(models, logging));
	}
}
