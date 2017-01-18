import Auth0Lock from 'auth0-lock'
import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'

function loginSuccess(profile){
	debugger
	let email = profile.email;
	return WebAPIUtils.getLoggedUser(email).then((userId) => {
		localStorage.loggedUserId = userId;
		return {
			type: types.LOGIN_SUCCESS,
			profile,
			userId
		}
	})
}

function loginError(err) {
	return {
		type: types.LOGIN_ERROR,
		err
	}
}


export function doAuthentication(){
	return dispatch => {
		const lock = new Auth0Lock('96GtA8F9eFYDP6mH3E2PxXt4NZiuOi8D', 'patron4change.eu.auth0.com')

		lock.on("authenticated", function(authResult) {
			lock.getProfile(authResult.idToken, function(error, profile) {

				if (error) {
					// handle error
					return dispatch(lockError(error))
				}
				debugger
				if(!localStorage.id_token){
					localStorage.setItem('profile', JSON.stringify(profile))
					localStorage.setItem('id_token', authResult.idToken)
				}
				loginSuccess(JSON.parse(localStorage.profile)).then((res) => {
					dispatch(res);
				})
			});
		});
	}
}

export function login() {
	let options = {
		theme:{
			logo: '/public/images/logo.png',
			primaryColor: '#006666'
		},

		language: 'de',
		avatar: null,
		allowedConnections: ['Username-Password-Authentication'],
		languageDictionary:{
			title: ""
		}

	}

	const lock = new Auth0Lock('96GtA8F9eFYDP6mH3E2PxXt4NZiuOi8D', 'patron4change.eu.auth0.com', options)

	return dispatch => {
		lock.on("authenticated", function(authResult) {
			lock.getProfile(authResult.idToken, function(error, profile) {

				if (error) {
					// handle error
					return dispatch(lockError(error))
				}
				localStorage.setItem('profile', JSON.stringify(profile))
				localStorage.setItem('id_token', authResult.idToken)
				dispatch(loginSuccess(profile))
			});
		});
		lock.show()

	}
}


function logoutSuccess(profile) {
	return {
		type: types.LOGOUT_SUCCESS
	}
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		localStorage.removeItem('loggedUserId');
		return dispatch(logoutSuccess());
	}
}
