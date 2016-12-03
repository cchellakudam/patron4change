module.exports = (sequelize, DataTypes) => {

	const StatusUpdate = sequelize.define('statusUpdate', {
		title: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(models){
				StatusUpdate.belongsTo(models.content, {foreignKey: 'fk_content_id', as: 'content'});
				StatusUpdate.belongsTo(models.changemaker, {foreignKey: 'fk_changemaker_id', as: 'changemaker'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return StatusUpdate;
}
