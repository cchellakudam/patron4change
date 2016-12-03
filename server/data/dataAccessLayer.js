import models from '../model/index';

function getMockUsers() {
	let arr = [];
	let i;
	for (i = 0; 10 > i; i++) {
		arr.push({ id: String(i) });
	}
	return arr;
}

export default class {

	static getAllUsers(){
		return Promise.resolve(getMockUsers());
	}

	static getUserForEmail(){
		throw new Error('not implemented');
	}

	static getUserForId(id){
		return models.user.findById(id);
	}

	static getAllChangemakers(){
		return models.changemaker.findAll({ where: { tags: 'I,is,super,awesome' } });
	}

	static getUpdatesByUserId(id) {
		return models.statusUpdate.findAll({ where: { changemakerId: id } });
	}

	// due to problems with our model layer, we will leave the logic to the
	// test with mock data, this test only checks that the call itself is functional
	static getFeaturedChangemakers(){
		return models.changemaker.findAll({ limit: 9 });
  }

	static getAllPatrons() {
		return Promise.resolve([]);
	}

}
