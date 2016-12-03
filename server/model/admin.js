
export default (sequelize) => {

	const Admin = sequelize.define('admin', {

	}, {
		classMethods: {
			associate: function(models){
				Admin.belongsTo(models.user, {foreignKey: 'fk_user_id', as: 'user'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Admin;
}
