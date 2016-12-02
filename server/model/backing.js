module.exports = (sequelize, DataTypes) => {

	const Backing = sequelize.define('backing', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		}
	}, {
		classMethods:{
			associate: function(models){
				Backing.belongsTo(models.changemaker, {foreignKey: 'backing_changemaker', as: 'changemaker'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Backing;
}
