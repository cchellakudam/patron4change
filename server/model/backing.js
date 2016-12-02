module.exports = (sequelize, DataTypes) => {

	const Backing = sequelize.define('backing', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

	}, {
	
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Backing;
}
