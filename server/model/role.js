module.exports = (sequelize, DataTypes) => {

	const Role = sequelize.define('role', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		roleName: {
			type: DataTypes.STRING(100)
		}
	}, {
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Role;
}
