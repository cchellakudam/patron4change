import queue from '../utils/queue';

module.exports = (sequelize, DataTypes) => {

	const Changemaker = sequelize.define('changemaker', {
		tags: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		isValidated: {
			type: DataTypes.BOOLEAN
		},
		videoUrl: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(models){
				Changemaker.belongsTo(models.user, {foreignKey: 'fk_user_id', as: 'user'});
				Changemaker.hasOne(models.content, {foreignKey: 'fk_content_id', as: 'mission'});
				Changemaker.hasMany(models.statusUpdate, {as: 'statusUpdates'});
				Changemaker.hasMany(models.backing, {as: 'backings'})
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	const pushUpdate = function (instance) {
		const updateQueue = queue('updateSearchIndex');
		if (updateQueue) {
			updateQueue.push(instance.get({ plain: true }));
		}
	};

	Changemaker.hook('afterCreate', pushUpdate);
	Changemaker.hook('afterUpdate', pushUpdate);

	return Changemaker;
}
