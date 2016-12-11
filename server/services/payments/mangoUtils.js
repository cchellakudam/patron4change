/*This section provides tools specific to the mangopay API*/
import request from 'request'
import axios from 'axios'
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
		console.log(url);
		return axios({
			method: 'post',
			url: url,
			data: formData,
			auth:{
				username: clientId,
				password: passwd
			}
		}).then(res => {
				console.log(res.data)
				return res.data;
			})
	}

	createWallet(naturalUserId){
		// create wallet for natural user
	}

	createCardPayment(){

	}
}
