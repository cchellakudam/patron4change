import models from '../model/index';

export default class{

	static getAllUnpaidPeriodicBackings(){
		let allBackings = periodic_backings.findAll({
			include: [
			{
				model: models.backing,
				as: 'backing',
				include: [
					{
						model: models.payment,
						as: 'payments'
					}
				]
			}
			],
		});

		return Promise.all([allBackings]).then((periodicBackings) => {
			unpaidBackings = [];
			let today = new Date();
			for(i=0;i<values.length;i++){
				let paid = false;
				for(j=0;j<values.length;j++){
					paymentDate = new Date(periodicBackings[i].backing.payments[j].transactionDate);
					if(today.getMonth() == paymentDate.getMonth()){
						paid = true;
					}
				}
				if(!paid){
					unpaidBackings.push(periodicBackings[i]);
				}
			}
			return unpaidBackings;
		});
	}

	static createPeriodicBacking(userId, changemakerId, amount, startDate){
		let changemakerPromise = models.changemaker.findById(changemakerId);
		let patronPromise = models.user.findById(userId)

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

			if(isNaN(startDate)){
				throw new Error('not a valid timestamp, UNIX timestamp only please')
			}
			let backing = models.periodicBacking.create({
			startDate:startDate,
			backing: {
				amount: amount,
				fkSenderId: userId,
				fkRecipientId: changemakerId,
			}
		},{
				include: [{
					model: models.backing, as: 'backing',
				}]
			});

		return backing
		})
	}
}

