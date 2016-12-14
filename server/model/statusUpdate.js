module.exports = (sequelize, DataTypes) => {

	const StatusUpdate = sequelize.define('statusUpdate', {
		title: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(models){
				StatusUpdate.belongsTo(models.content, {foreignKey: 'fkContentId', as: 'content'});
				StatusUpdate.belongsTo(models.changemaker, {foreignKey: 'fkChangemakerId', as: 'changemaker'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return StatusUpdate;
}
