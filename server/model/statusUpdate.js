module.exports = (sequelize, DataTypes) => {

	const StatusUpdate = sequelize.define('statusUpdate', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		title: {
			type: DataTypes.STRING
		}	

	}, {
		classMethods: {
			associate: function(models){
				StatusUpdate.belongsTo(models.content, {foreignKey: 'statusUpdate_content', as: 'content'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return StatusUpdate;
}
