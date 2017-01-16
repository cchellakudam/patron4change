import Auth0Lock from 'auth0-lock'
import types from '../constants/ActionTypes'


function loginSuccess(profile) {
	return {
		type: types.LOGIN_SUCCESS,
		profile
	}
}

function loginError(err) {
	return {
		type: types.LOGIN_ERROR,
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
		lock.show((err, profile, token) => {
			if(err) {
				return dispatch(loginError(err))
			}
			localStorage.setItem('profile', JSON.stringify(profile))
			localStorage.setItem('id_token', token)
			return dispatch(loginSuccess(profile))
		})
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
