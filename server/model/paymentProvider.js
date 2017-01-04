export default (sequelize, DataTypes) => {

	const paymentProvider = sequelize.define('paymentProvider', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		label: {
			type: DataTypes.STRING
		}
	}, {
		classMethods:{
			associate: function(models){
				paymentProvider.belongsToMany(models.changemaker,
						{as: 'paymentAccountId', through: models.paymentServiceData, foreignKey: 'fkChangemakerId'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return paymentProvider;
};
