import models from '../../../server/model/index';
import { createData } from './testInsert';

export default class {

	static refreshDB() {
		return models.sequelize.sync({
			force: true,
			logging: false
		}).then(() => createData(models));
	}
}
