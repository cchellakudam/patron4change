module.exports = (sequelize) => {

	const singleBacking = sequelize.define('singleBacking', {
	}, {
		classMethods:{
			associate: function(models){
				singleBacking.belongsTo(models.backing, {foreignKey: 'fk_backing_id', as: 'backing'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return singleBacking;
};
