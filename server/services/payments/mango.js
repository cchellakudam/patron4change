import mangoUtils from './mangoUtils'

/* All payment service classes consist
 * of a set of mandatory methods that provide
  * the service, and a set of methods only
  * to be used locally in the 'public' methods*/
export default class{

	constructor(dao){
		this.dao = dao;
	}


	registerUser(userObject){
		 return mangoUtils.createNaturalUser(userObject);
	}

	payUserWithCard(userObject, amount){
		// TODO need to send an API call to request payment
	}




}
