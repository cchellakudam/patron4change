module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		username: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		emailConfirmed: {
			type: DataTypes.BOOLEAN
		},
		
		isAnonymous: {
			type: DataTypes.BOOLEAN
		},
		
		isBlocked: {
			type: DataTypes.BOOLEAN
		},

		pwhash: {
			type: DataTypes.STRING(60)
		},
	}, {
		classMethods: {
			associate: function(models){
				User.hasMany(models.backing, {as: 'backings'});
				User.hasMany(models.user, { as: 'reportsAgainstUser'});
				User.hasMany(models.user, { as: 'reportsByUser'});
			}
		},
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return User;
}
