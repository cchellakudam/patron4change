module.exports = (sequelize, DataTypes) => {

	const UserIncident = sequelize.define('userIncident', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		}	
	}, {
		classMethods: {
			associate: function(models){
				UserIncident.belongsTo(models.user, {foreignKey: 'userIncident_content', as: 'content'});
			}
		},
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return UserIncident;
};
