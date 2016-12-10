/* eslint no-console: 0 */
import models from '../../../server/model/index'

export default class {

	static refreshDB(){
		return (
		Promise.resolve(
        models.sequelize.sync({force: true})
        .then(() => {
          return models.content.bulkCreate(require('../../../mock/content.json'));
        })
        .then(() => {
          return models.user.bulkCreate(require('../../../mock/users.json'));
        })
        .then(() => {
          return models.changemaker.bulkCreate(require('../../../mock/changemakers.json'));
        })
        .then(() => {
          return models.statusUpdate.bulkCreate(require('../../../mock/status_update.json'));
        })
		))
	}
}

