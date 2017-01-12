import models from '../model/index';

export default class{

	static getAllUnpaidPeriodicBackings(){
		return  models.periodicBacking.findAll({
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
		}).then((periodicBackings) => {
			let unpaidBackings = [];
			let today = new Date();
			for(let i=0;i<periodicBackings.length;i++){
				let paid = false;
				for(let j=0;j<periodicBackings[i].backing.payments.length;j++){
					let paymentDate = new Date(periodicBackings[i].backing.payments[j].transactionDate);
					if(today.getMonth() === paymentDate.getMonth() && today.getYear() === paymentDate.getYear()){
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

