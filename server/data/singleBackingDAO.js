import models from '../model/index';

export default class {

	static getSingleBacking(){
		return models.single_backings.findAll()
	}
}
