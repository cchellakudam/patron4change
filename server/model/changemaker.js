module.exports = (sequelize, DataTypes) => {

	const Changemaker = sequelize.define('changemaker', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		tags: {
			type: DataTypes.STRING
		},
		videoId: {
			type: DataTypes.STRING(200)
		},
		
		isValidated: {
			type: DataTypes.BOOLEAN
		},
		
	}, {
		classMethods: {
			associate: function(models){
				Changemaker.belongsTo(models.user, {foreignKey: 'changemaker_user', as: 'user'});
				Changemaker.belongsTo(models.content, {foreignKey: 'changemaker_content', as: 'mission'});
				Changemaker.hasMany(models.statusUpdate, {as: 'statusUpdates'});
			}
		},
		
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Changemaker;
}