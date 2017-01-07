/* This section provides tools specific to the mangopay API */
import axios from 'axios'
import paymentDAO from '../../data/paymentDAO'
const clientId = 'p4case2016';
const passwd = '9yvjwv183gUuvHmzmCOgoDOWOSNSGL0MKkGNovYuXFMB625aSJ';
const apiRoot = 'https://api.sandbox.mangopay.com';
export default class {

	static createNaturalUser(userObject){
		let url =  `${apiRoot}/v2.01/${clientId}/users/natural/`
		let formData = {
			FirstName: userObject.firstName,
			LastName: userObject.lastName,
			Birthday: userObject.birthday,
			Nationality: userObject.nationality,
			CountryOfResidence: userObject.countryOfResidence,
			Email: userObject.email
		};
		return axios({
			method: 'post',
			url: url,
			data: formData,
			auth:{
				username: clientId,
				password: passwd
			},
			headers: {
				'content-type': 'application/json'
			}
		}).then(res => {
				if(!res.data.errors){
						paymentDAO.registerChangemakerToProvider(userObject.userId, 1, res.data.Id);
						return res.data.Id;
				}else{
					throw new Error('An error occured during creation of mango user')
				}
			}).catch((err) => {
				throw err;
			});
	}

	static createWallet(naturalUserId, changemakerId){
		let url = `${apiRoot}/v2.01/${clientId}/wallets/`
		let formData = {
			Owners: [naturalUserId],
			Description: `wallet for changemaker ${changemakerId}`,
			Currency: 'EUR'
		};

		return axios({
			method: 'post',
			url: url,
			data: formData,
			auth:{
				username: clientId,
				password: passwd
			},
			headers:{
				'content-type' : 'application/json'
			}
		}).then(res => {
				if(!res.data.errors){
					return res.data.Id;
				}else{
					throw new Error('An error occured during creation of mango wallet')
				}
			})
				.catch((err) => {
			throw err;
		})
	}

	static getUserWallet(naturalUserId){
			let url = `${apiRoot}/v2.01/${clientId}/users/${naturalUserId}/wallets`;

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

	static createCardPayment(naturalUserId, amount, userId, changemakerId){
		let url = `${apiRoot}/v2.01/${clientId}/payins/card/web`;
		let formDataPromise = this.getUserWallet(naturalUserId).then((res)=>{
			return {
          AuthorId: naturalUserId,
          DebitedFunds:{
            'Currency': 'EUR',
            'Amount': amount
          },
          Fees:{
            'Currency': 'EUR',
            'Amount': 0
          },
          ReturnUrl: 'http://localhost:3000',
          CreditedWalletId: res,
          CardType: 'CB_VISA_MASTERCARD',
          Culture: 'DE'
        }
		}).catch((err) => {
			throw err;
		});
		return Promise.all([formDataPromise]).then((value) => {
			return axios({
				method: 'post',
				url: url,
				data: value[0],
				auth:{
					username: clientId,
					password: passwd
				},
				headers:{
					'content-type': 'application/json'
				}
			}).then((res) => {
				if(res.data.errors){
					throw Error('mango transaction failed');
				}else if(userId && changemakerId && amount){
					paymentDAO.createSingleBacking(userId, changemakerId, res.data.Id, amount, res.data.CreationDate);
					return res.data.RedirectURL;
				}else{
					throw new Error('parameter problem, please check parameters given');
				}

			}).catch((err) => {
				throw err;
			})
		})

	}
}
