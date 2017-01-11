/* This section provides tools specific to the mangopay API */
import axios from 'axios'
import paymentDAO from '../../data/paymentDAO'
import periodicBackingDAO from '../../data/periodicBackingDAO'
import singleBackingDAO from '../../data/singleBackingDAO'

var mangopay = require('mangopay2-nodejs-sdk');
const clientId = 'p4case2016'
const passwd = '9yvjwv183gUuvHmzmCOgoDOWOSNSGL0MKkGNovYuXFMB625aSJ'
export default class {
	constructor(){
		this.api = new mangopay({
			clientId: 'p4case2016',
			clientPassword: '9yvjwv183gUuvHmzmCOgoDOWOSNSGL0MKkGNovYuXFMB625aSJ',
			baseUrl: 'https://api.sandbox.mangopay.com'
		});
	}
	createNaturalUser(userObject, userId){
		return this.api.Users.create(userObject).then((myUser) => {
			return paymentDAO.registerChangemakerToProvider(userId, 1, myUser.Id)
		}).then((paymentAccount) => {
			return paymentAccount.accountId
		})
	}

	createWallet(accountId, userId){
		return this.api.Wallets.create({
			Currency: 'EUR',
			Description: `wallet for user ${userId}`,
			Owners: [accountId]
		}).then((res) => {return res.Id})
	}

	getUserWallet(accountId){
			let url = `https://api.sandbox.mangopay.com/v2.01/${clientId}/users/${accountId}/wallets`;

			return axios({
					url: url,
					method: 'get',
					auth:{
						username: clientId,
						password: passwd
					}
				}).then((res) => {
					if(!res.data.errors){
				return res.data[0].Id;
			}else{
						throw new Error('parameter probem')
					}
				}).catch((err) => {
					throw err;
				})
	}

	createCardPayment(accountId, amount, userId, changemakerId) {
		return this.getUserWallet(accountId).then((walletId) =>{
			return this.api.PayIns.create({
				AuthorId: accountId,
				DebitedFunds:{
					'Currency': 'EUR',
					'Amount': amount
				},
				Fees:{
					'Currency': 'EUR',
					'Amount': 0
				},
				ReturnUrl: 'http://localhost:3000',
				CreditedWalletId: walletId,
				CardType: 'CB_VISA_MASTERCARD',
				Culture: 'DE',
				PaymentType: 'CARD',
				ExecutionType: 'WEB'
			})
		}).then((res) => {
			let newBacking = singleBackingDAO.createSingleBacking(userId, changemakerId, res.Id, amount, res.CreationDate);
			return [res.RedirectURL, newBacking];
		}).then((values) => {
			return values[0];
		})

	}



	preRegisterCard(accountId){
		return this.api.CardRegistrations.create({
			UserId: accountId,
			Currency: 'EUR',
		}).then((preRegistrationData) => {
			let updateStatus = paymentDAO.setCardRegistrationForAccount(accountId, 1, preRegistrationData.Id);
			return [updateStatus, preRegistrationData]
		}).then((values) => {
			return values[1]
		})


	}

	static sendTestCardData(preRegistrationData){
		let formData = {
			cardNumber: '4706750000000009',
			cardExpirationDate: '08/20',
			cardCvx: '000',
			data: preRegistrationData.preRegistrationData,
			accessKeyRef: preRegistrationData.accessKey,
			returnUrl: 'http://localhost:3000'
		};

		console.log(formData)
		console.log(preRegistrationData.registrationUrl)
		return axios({
			method: 'post',
			url: preRegistrationData.registrationUrl,
			data: formData,
			auth:{
				username: clientId,
				password: passwd
			},
			headers: {
				'content-type': 'application/json'
			}
		}).then((res) => {
				return res.data
			}).catch((err) => {throw err;})
	}

	static registerCard(registrationData, registrationId){
		let url = `${apiRoot}/v2.01/${clientId}/${registrationId}`;
		let formData = {
			RegistrationData: registrationData
		}
		return axios({
			method: 'put',
			url: url,
			data: formData,
			auth:{
				username: clientId,
				password: passwd
			},
			headers: {
				'content-type': 'application/json'
			}
		}).then((res) => {
				if(res.data.errors){
					throw new Error('mango card registration transaction failed')
				}else if(registrationData && registrationId){
					return res.data;
				}else{
					throw new Error('paramter problem, please check parameters again')
				}
			}).catch((err) => {
				throw err;
			})
	}

	static createPeriodicBacking(accountId, registrationData, userId, changemakerId, amount, startDate){
		return periodicBackingDAO.createPeriodicBacking(userId, changemakerId, amount, startDate);

	}

	static getCardId(cardRegistrationId){
		let url = `${apiRoot}/v2.01/${clientId}/${cardRegistrationId}`;
		return axios({
			method: 'get',
			url: url,
			auth:{
				username: clientId,
				password: passwd
			},
			headers: {
				'content-type': 'application/json'
			}
		}).then((res) => {
				return res.data.CardId;
			}).catch((err) => {
				throw err;
			})
	}

	static getBulkCardIds(cardRegistrationIds){
		allCardIdPrmises = [];
		for(i=0;i<cardRegistrationIds.length;i++){
			allCardIdPrmises.push(getCardId(cardRegistrationIds[i]));
		}
		return allCardIdPrmises;
	}

	static makeMonthlyPayments(){
		let allUnpaidBackings = periodicBackingDAO.getAllUnpaidPeriodicBackings();
		for(i=0;i<allUnpaidBackings.length;i++){
			makeMonthlyPayment(allUnpaidBackings[i].fkSenderId, allUnpaidBackings[i].fkRecipientId,
				allUnpaidBackings[i].amount, allUnpaidBackings[i].id	);
		}

	}

	static makeMonthlyPayment(senderId, recipientId, amount, backingId){
		let senderAccountId = paymentDAO.AccountIdForUser(senderId, 1);
		let recipientWalletId = paymentDAO.AccountIdForUser(recipientId, 1)
			.then((res) => {
				return getUserWallet(res);
			});
		let senderCardId = paymentDAO.getCardRegistrationForUser(senderId, 1);

		Promise.all([senderAccountId, recipientWalletId, senderCardId]).then((values) => {
			return makePayment(values[2], values[0], values[1], amount);
		}).then((res) => {
				paymentDAO.createPayment(amount, transactionDate, transactionId, backingId)
		})

	}

	static makePayment(cardId, senderId, walletId, amount){
		url = `${apiRoot}/v2.01/${clientId}/card/direct`;
		let formData = {
			AuthorId: senderId,
			CreditedWalletId: walletId,
			DebitedFunds:{
            'Currency': 'EUR',
            'Amount': amount
          },
      Fees:{
        'Currency': 'EUR',
        'Amount': 0
      },
			CardId: cardId,
			SecureModeReturnURL: 'http://localhost:3000'
		}

		axios({
			method: 'post',
			url: url,
			data: formData,
			auth: {
				username: clientId,
				password: passwd
			},
			headers:{
				'content-type': 'application/json'
			}
		}).then((res) => {
			return {transactionId: res.Id, transactionDate: res.CreationDate}
		}).catch((err) => {throw err;})
	}
}



