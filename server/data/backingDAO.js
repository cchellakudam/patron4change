import models from '../model/index';

export default class{
	static getBackingsbyPatronId(){
		models.backings.findAll();
	}
}
