/* eslint no-console: 0 */

require('babel-register');
const models = require('./server/model');

models.sequelize.sync().then(() => {
  return models.content.bulkCreate(require('./mock/content.json'));
})
.then(() => {
  return models.user.bulkCreate(require('./mock/users.json'));
})
.then(() => {
  return models.changemaker.bulkCreate(require('./mock/changemakers.json'));
})
.then(() => {
  return models.statusUpdate.bulkCreate(require('./mock/status_update.json'));
})
.then(() => {
  process.exit();
})
.catch(console.error);
