/* eslint no-console: 0 */
import models from '../../../server/model/index'

export default class {

	static refreshDB(){
		return (
		Promise.resolve(
        models.sequelize.sync({force: true})
        .then(() => {
          return models.content.bulkCreate(require('../../../mock/content.json'), {logging:false});
        })
        .then(() => {
          return models.user.bulkCreate(require('../../../mock/users.json'), {logging:false});
        })
        .then(() => {
          return models.changemaker.bulkCreate(require('../../../mock/changemakers.json'), {logging:false});
        })
        .then(() => {
          return models.statusUpdate.bulkCreate(require('../../../mock/status_update.json'), {logging:false});
        })
				.then(() => {
        	return models.paymentProvider.bulkCreate(require('../../../mock/paymentProviders.json'), {logging:false});
				}).then(() => {
        	return models.backing.bulkCreate(require('../../../mock/backings.json'), {logging:false});
				}).then(() => {
					return models.periodicBacking.bulkCreate(require('../../../mock/periodic_backings.json'), {logging:false})
				}).then(() => {
        	return models.paymentServiceData.bulkCreate(require('../../../mock/paymentServiceData.json'), {logging:false})
				}).then(() => {
        	return models.payment.bulkCreate(require('../../../mock/payments.json'), {logging:false})
				}).catch((err) => {
        	console.log(err)
        })
		))
	}
}


