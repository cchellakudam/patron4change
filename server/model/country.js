export default (sequelize, DataTypes) => {

	const Country = sequelize.define('country', {
		id: {
			type: DataTypes.STRING(3),
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(70)
		}
	}, {
		classMethods: {
			associate: function(models){
				Country.hasOne(models.user, {as: 'nationality', foreignKey: 'fkCountryIdNationality'});
				Country.hasOne(models.user, {as: 'countryOfResidence', foreignKey: 'fkCountryIdResidence'});
			}
		},
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Country;
};
