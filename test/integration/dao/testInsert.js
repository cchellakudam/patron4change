/* eslint no-console: 0 */

function testInsert(models) {
	return models.content.bulkCreate(require('../../../mock/content.json'))
		.then(() => {
			return models.user.bulkCreate(require('../../../mock/users.json'));
		})
		.then(() => {
			return models.changemaker.bulkCreate(require('../../../mock/changemakers.json'));
		})
		.then(() => {
			return models.statusUpdate.bulkCreate(require('../../../mock/status_update.json'));
		})
		.then(() => {
			return models.paymentProvider.bulkCreate(require('../../../mock/paymentProviders.json'));
		})
		.then(() => {
			return models.backing.bulkCreate(require('../../../mock/backings.json'));
		})
		.catch((err) => {
			console.error(err);
		});
}

module.exports = { testInsert };
