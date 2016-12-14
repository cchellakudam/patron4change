import models from '../model/index';

export default class{

	static getAllperiodicBackings(){
		models.periodic_backings.findAll();
	}
}
