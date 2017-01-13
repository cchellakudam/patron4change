import mangoUtils from './mangoUtils'

/* All payment service classes consist
 * of a set of mandatory methods that provide
  * the service, and a set of methods only
  * to be used locally in the 'public' methods*/
export default class{

	constructor(dao){
		this.dao = dao;
		this.mango = new mangoUtils();
	}

	registerUser(userObject){
		let userId = userObject.userId;
		delete userObject.userId;
		let naturalUserIdP = this.mango.createNaturalUser(userObject, userId);
		return Promise.all([naturalUserIdP]).then((naturalUserId) => {
				this.mango.createWallet(naturalUserId, userObject.userId);
			return naturalUserId;
		}).catch((err) => {
			throw err;
		});
	}

	payUserWithCard(patronId, amount, changemakerId, accountId){
		return this.mango.createCardPayment(accountId, amount, patronId, changemakerId).catch((err) => {
				throw err;
			})
	}

/* This method only takes any kind of security token or registration
* data as a parameter. All card details should be processed browser side
* and NOT pass through the application server! */
	registerCreditCardForRecurringPayment(registrationData){
		return this.mango.registerCard(registrationData.registraionData, registrationData.registrationId)
			.catch((err) => {
				throw err;
			})
	}

	/* When card details need to be sent to an external provider
	* and pre-treatment will be done here (i.e. user account details)
	* Only information relevant to sending card details will be sent
	*(i.e. provider URL or security token) The card details will be sent
	* through the browser*/
	prepareToReadCardDetails(preTreatmentData){
		return this.mango.preRegisterCard(preTreatmentData.accountId)
			.catch((err) => {
			throw err;
		})
	}


	createRecurringPayment(paymentData){
		return this.mango.createPeriodicBacking(paymentData.patronId, paymentData.changemakerId,
			paymentData.amount, paymentData.startDate)
	}

	monthlyPayment(){
		return this.mango.makeMonthlyPayments();
	}

}
