import models from '../model/index';

function getMockUsers() {
	let arr = [];
	let i;
	for (i = 0; 10 > i; i++) {
		arr.push({ id: String(i) });
	}
	return arr;
}

module.exports = {

	getAllUsers(){
		return Promise.resolve(getMockUsers());
	},

	getUserForEmail(){
	},

	getUserForId(){
	},

	getAllChangemakers(){
		return models.changemaker.findAll({ where: { tags: 'I,is,super,awesome'}});
	},

	getFeaturedChangemakers(){

	},

}
