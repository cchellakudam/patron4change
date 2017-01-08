import models from '../model/'

export default class {
	static getAllChangemakers() {
		return models.changemaker.findAll();
	}

	static getChangemakerById(id) {
		return models.changemaker.find({
			where: { id: id },
			include: [
				{model: models.user, as:'user'},
				{model: models.content, as: 'mission'},
				{model: models.statusUpdate, as: 'statusUpdates', include: [
					{model: models.content, as: 'content'}
				]}
			],
			order: [
				[{model: models.statusUpdate, as: 'statusUpdates'}, 'createdAt', 'DESC']
			]
		});
	}

	static getFeaturedChangemakers() {
		return models.changemaker.findAll(
			{
				include: [
					{model: models.user, as:'user'},
					{model : models.content, as: 'mission'}
				], raw: true
			}
		).then(changemakers =>{  // view model creation
			let changemakerViewModels = []
			changemakers.forEach(changemaker => {
				let changemakerViewModel = {name: '', avatarUrl: '', mission: '', id: 0};
				changemakerViewModel.id = changemaker.id;
				changemakerViewModel.name = changemaker['user.firstName'] + ' ' +changemaker['user.lastName'];
				changemakerViewModel.avatarUrl = changemaker['user.avatarUrl'];
				changemakerViewModel.mission = changemaker['mission.text'];
				changemakerViewModels.push(changemakerViewModel);
			});
			return changemakerViewModels;
		});
	}


}
