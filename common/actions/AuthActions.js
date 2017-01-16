import Auth0Lock from 'auth0-lock'
import types from '../constants/ActionTypes'

const [SUCCESS, ERROR] = [
	types.LOGIN_SUCCESS,
	types.LOGIN_ERROR
];

function loginSuccess(profile){
	debugger
	return {
		type: SUCCESS,
		profile,
	}
}

function loginError(err) {
	return {
		type: ERROR,
		errs
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
		lock.show()
		lock.on("authenticated", function(authResult) {
			lock.getProfile(authResult.idToken, function(error, profile) {

				if (error) {
					// handle error
					return dispatch(lockError(error))
				}

				localStorage.setItem('profile', JSON.stringify(profile))
				localStorage.setItem('id_token', authResult.idToken)
				return dispatch(loginSuccess(profile))
			});
		});
	}
}


function logoutSuccess(profile) {
	return {
		type: LOGOUT_SUCCESS
	}
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		return dispatch(logoutSuccess());
	}
}
