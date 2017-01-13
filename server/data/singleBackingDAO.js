/**
 * Created by ling on 08.12.16.
 */
import models from '../model/index';

export default class {

	static createSingleBacking(userId, changemakerId, transactionId, amount, transactionDate) {
		let changemakerPromise = models.changemaker.findById(changemakerId);
		let patronPromise = models.user.findById(userId)

		return Promise.all([changemakerPromise, patronPromise]).then(values => {
		if(!values[0]){
			throw new Error(`changemaker ${changemakerId} does not exist`);
		}
		if (!values[1]) {
			throw new Error(`user ${userId} does not exist`)
		}

		if (userId === changemakerId) {
			throw new Error('a changemaker cannot back himself!')
		}

		if (isNaN(amount)) {
			throw new Error('not a valid amount');
		}

		if (isNaN(transactionDate)) {
			throw new Error('not a valid timestamp, UNIX timestamp only please')
		}
		let backing = models.singleBacking.create({
			backing: {
				amount: amount,
				fkSenderId: userId,
				fkRecipientId: changemakerId,
				payments: [{
					amount: amount,
					transactionDate: transactionDate,
					transactionId: transactionId
				}]
			}
		}, {
			include: [{
				model: models.backing, as: 'backing',
				include: [{model: models.payment, as: 'payments'}]
			}]
		});

		return backing
	})


	}
}
