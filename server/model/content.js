module.exports = (sequelize, DataTypes) => {

	const Content = sequelize.define('content', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		text: {
			type: DataTypes.TEXT
		}
	}, {
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Content;
}
