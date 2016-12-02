import models from '../model/index';

function getMockUsers() {
	let arr = [];
	let i;
	for (i = 0; 10 > i; i++) {
		arr.push({ id: String(i) });
	}
	return arr;
}

module.exports =  {

	getAllUsers(){
		return Promise.resolve(getMockUsers());
	},

	getUserForEmail(){
	},

	getUserForId(id){
		return models.user.findById(id);
	},

	getAllChangemakers(){
		return models.changemaker.findAll({ where: { tags: 'I,is,super,awesome'}});
	},

	getUpdatesByUserId(id) {
		return models.statusUpdate.findAll({ where: { changemakerId: id } });
	}

}
