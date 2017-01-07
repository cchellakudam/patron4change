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

}
