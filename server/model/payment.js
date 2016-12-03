export default (sequelize, DataTypes) => {

	const payment = sequelize.define('payment', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		amount: {
			type: DataTypes.INTEGER
		},
		currency: {
			type: DataTypes.STRING(3)
		},
		transactionDate: {
			type: DataTypes.DATE
		}
	}, {
		classMethods:{
			associate: function(models){
				payment.belongsTo(models.backing, {foreignKey: 'fk_backing_id', as: 'backing'});
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return payment;
};
