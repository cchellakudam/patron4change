
export default (sequelize, DataTypes) => {


	const ContentFlag = sequelize.define('contentFlag', {},
		{
		classMethods: {
			associate: function(models){
				ContentFlag.belongsTo(models.user, {foreignKey: 'fk_reporter', as: 'user'});
				ContentFlag.belongsTo(models.content, {foreignKey: 'fk_reported_content', as: 'content'});
			}
		},
	}, {
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return ContentFlag;
}
