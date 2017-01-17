import models from '../../../server/model/index';
import { testInsert } from './testInsert';

export default class {

	static refreshDB() {
		return models.sequelize.sync({
			force: true,
			logging: false
		}).then(() => testInsert(models));
	}
}
