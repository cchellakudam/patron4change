import Auth0Lock from 'auth0-lock'
import {browserHistory} from 'react-router'

export default class AuthService{
	constructur(clientId, domain){
		// configure Auth
		this.lock = new Auth0Lock(clientId, domain, {
			auth: {
				redirectUrl: 'http://localhost:3000/login',
				responseType: 'token'
			}
		})

		// Add callback for lock 'authenticated event'
		this.lock.on('authenticated', this._doAuthentication.bind(this))
		// binds login functions to keep this context
		this.login = this.login.bind(this)
	}

	_doAuthentication(authResult){
		// save user token
		this.setToken(authResult.idToken)
		// navigate to home
		browserHistory.replace('/home')
	}

	login(){
		// call the show method to display the widget
		this.lock.show()
	}

	loggedIn(){
		// checks to see there is a valid token saved
		return !!this.getToken()
	}

	setToken(idToken){
		// saves user token to local storage
		localStorage.setItem('id_token', idToken)
	}

	getToken(){
		// retrieves the user token from local storage
		return localStorage.getItem('id_token')
	}

	logout(){
		// clear user token and profile data from local storage
		localStorage.removeItem('id_token');
	}
}
