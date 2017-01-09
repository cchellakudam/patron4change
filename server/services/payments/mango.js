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
		let naturalUserIdP = mangoUtils.createNaturalUser(userObject);
		return Promise.all([naturalUserIdP]).then((naturalUserId) => {
			mangoUtils.createWallet(naturalUserId, userObject.changemakerId);
			return naturalUserId;
		}).catch((err) => {
			throw err;
		});
	}

	payUserWithCard(patronId, amount, changemakerId, accountId){
		return mangoUtils.createCardPayment(accountId, amount, patronId, changemakerId).catch((err) => {
				throw err;
			})
	}

/* This method only takes any kind of security token or registration
* data as a parameter. All card details should be processed browser side
* and NOT pass through the application server! */
	registerCreditCardForRecurringPayment(RegistrationData){
		// TODO receive registration data
		return 0;
	}

	/* When card details need to be sent to an external provider
	* and pre-treatment will be done here (i.e. user account details)
	* Only information relevant to sending card details will be sent
	*(i.e. provider URL or security token) The card details will be sent
	* through the browser*/
	prepareToReadCardDetails(preTreatmentData){
		// TODO create cardRegistration with mango and preRegistrationData
		return 0;
	}


	createRecurringPayment(){

	}

	monthlyPayment(){
		// TODO get all cardIds from CardRegistrationData
	}

}
