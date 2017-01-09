/* eslint no-console: 0 */

require('babel-register');
const models = require('./server/model');

models.sequelize.sync({'force': true})
.then(() => {
  return models.content.bulkCreate(require('./mock/content.json'), {logging:false});
})
.then(() => {
  return models.user.bulkCreate(require('./mock/users.json'), {logging:false});
})
.then(() => {
  return models.changemaker.bulkCreate(require('./mock/changemakers.json'), {logging:false});
})
.then(() => {
  return models.statusUpdate.bulkCreate(require('./mock/status_update.json'), {logging:false});
})
.then(() => {
	return models.paymentProvider.bulkCreate(require('./mock/paymentProviders.json'), {logging:false});
})
.then(() => {
  process.exit();
})
.catch(console.error);
