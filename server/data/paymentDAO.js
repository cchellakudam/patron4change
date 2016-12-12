/**
 * Created by ling on 08.12.16.
 */
import models from '../model/index';

export default class{

	static registerChangemakerToProvider(changemakerId, providerId, accountId) {
		var changemakerPromise = models.changemaker.findById(changemakerId);
		var providerPromise = models.paymentProvider.findById(providerId);

		return Promise.all([changemakerPromise, providerPromise]).then(values => {
				if(!values[0]){
					throw new Error(`changemaker ${changemakerId} does not exist`);
				}
				if(!values[1]){
					throw new Error(`provider ${providerId} does not exist`);
				}
				var pp = models.paymentServiceData.create({
					accountId: accountId,
					fkChangemakerId: changemakerId,
					fkPaymentProviderId: providerId
				}).then((paymentServiceData) => {
					return paymentServiceData;
				});

				return pp;

			})
	}

	static createSingleBacking(userId, changemakerId, transactionId, amount, transactionDate){
		var changemakerPromise = models.changemaker.findById(changemakerId);
		var patronPromise = models.user.findById(userId)

		return Promise.all([changemakerPromise, patronPromise]).then(values => {
			if(!values[0]){
				throw new Error(`changemaker ${changemakerId} does not exist`);
			}
			if(!values[1]){
				throw new Error(`user ${userId} does not exist`)
			}

			if(userId === changemakerId){
				throw new Error('a changemaker cannot back himself!')
			}

			if(isNaN(amount)){
				throw new Error('not a valid amount');
			}

			if(isNaN(transactionDate)){
				throw new Error('not a valid timestamp, UNIX timestamp only please')
			}
			var backing = models.singleBacking.create({
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
		},{
				include: [{
					model: models.backing, as: 'backing',
					include: [{model: models.payment, as: 'payments'}]
				}]
			});

		return backing
		})
	}

}
