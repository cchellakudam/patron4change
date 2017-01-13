/* This section provides tools specific to the mangopay API */
import axios from 'axios'
import paymentDAO from '../../data/paymentDAO'
import periodicBackingDAO from '../../data/periodicBackingDAO'
import singleBackingDAO from '../../data/singleBackingDAO'

const mangopay = require('mangopay2-nodejs-sdk');
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
			return Promise.resolve([updateStatus, preRegistrationData])
		}).then((values) => {
			return values[1]
		}).catch((err) => {
			throw err;
		})


	}

	sendTestCardData(preRegistrationData){
		// need to simulate urlencode, axios doesn't handle this!
		let querystring = require('querystring');
		let formData = {
			cardNumber: '4706750000000009',
			cardExpirationDate: '0820',
			cardCvx: '000',
			data: preRegistrationData.PreregistrationData,
			accessKeyRef: preRegistrationData.AccessKey,
		};

		return axios({
			method: 'post',
			url: preRegistrationData.CardRegistrationURL,
			data: querystring.stringify(formData),
			auth:{
				username: clientId,
				password: passwd
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((res) => {
				return {data: res.data, registrationId: preRegistrationData.Id}
			}).catch((err) => {throw err;})
	}

	registerCard(registrationData, registrationId){
		return this.api.CardRegistrations.update({
			RegistrationData: registrationData,
			Id: registrationId
		}).then((res) => {
			return registrationId;
		})
	}

	 createPeriodicBacking(userId, changemakerId, amount, startDate){
		return periodicBackingDAO.createPeriodicBacking(userId, changemakerId, amount, startDate).catch((err) => {
			console.log(err)
			throw err;
		});
	}

	getCardId(cardRegistrationId){
		return this.api.CardRegistrations.get(cardRegistrationId).then((res) => {
			return res.CardId;
		}).catch((err) => {throw err;})
	}

	getBulkCardIds(cardRegistrationIds){
		allCardIdPrmises = [];
		for(i=0;i<cardRegistrationIds.length;i++){
			allCardIdPrmises.push(getCardId(cardRegistrationIds[i]));
		}
		return allCardIdPrmises;
	}

	makeMonthlyPayments(){
		let allUnpaidBackings = periodicBackingDAO.getAllUnpaidPeriodicBackings();
		for(i=0;i<allUnpaidBackings.length;i++){
			this.makeMonthlyPayment(allUnpaidBackings[i].fkSenderId, allUnpaidBackings[i].fkRecipientId,
				allUnpaidBackings[i].amount, allUnpaidBackings[i].id	);
		}

	}

	makeMonthlyPayment(senderId, recipientId, amount, backingId){
		let senderAccountId = paymentDAO.getAccountIdForUser(senderId, 1);
		let recipientWalletId = paymentDAO.getAccountIdForUser(recipientId, 1)
			.then((res) => {
				return this.getUserWallet(res);
			});
		let senderCardId = paymentDAO.getCardRegistrationForUser(senderId, 1)
			.then((cardRegistrationId) => {
				return this.getCardId(cardRegistrationId)
			});

		return Promise.all([senderAccountId, recipientWalletId, senderCardId]).then((values) => {
			if(!senderAccountId || !recipientWalletId){
				throw new Error('one or more users do not have a payment account');
			}
			return this.makePayment(values[2], values[0], values[1], amount);
		}).then((res) => {
				return paymentDAO.createPayment(amount, res.transactionDate, res.transactionId, backingId)
		}).then(() => {
			return true;
		})

	}

	makePayment(cardId, senderAccountId, walletId, amount){
		return this.api.PayIns.create({
			AuthorId: senderAccountId,
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
			ExecutionType: 'DIRECT',
			CardId: cardId,
			SecureModeReturnURL: 'http://localhost:3000'
		}).then((res) => {
			return {transactionId: res.Id, transactionDate: res.CreationDate}
		}).catch((err) => {throw err;})
	}
}



