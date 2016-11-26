module.exports = (sequelize, DataTypes) => {

	const RoleUser = sequelize.define('roleUser', {
	}, {
		classMethods: {
			associate: function(models){
				RoleUser.belongsTo(models.user, {foreignKey: 'Role_User', as: 'user'});
				RoleUser.belongsTo(models.role, {foreignKey: 'Role_RoleUser', as: 'role'});

			}
		},
			freezeTableName: false // Model tableName will be the same as the model name
	});

	return RoleUser;
}
