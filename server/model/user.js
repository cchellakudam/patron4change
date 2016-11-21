'use strict';

module.exports = (sequelize, DataTypes) => {

	var User = sequelize.define('user', {
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
		pwhash: {
			type: DataTypes.STRING(60)
		},
		role: {
			type: DataTypes.STRING
		}
	}, {
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return User;
};
