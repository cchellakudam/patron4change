import React, { Component } from 'react'
import { Link } from 'react-toolbox/lib/link';
import styles from '../../client/css/modules/main-nav.scss';


export default class Auth extends Component {

	render() {

		const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props
		let loginButton = null;
		if(!isAuthenticated){
			loginButton = <Link className={styles.changemakerLink} onClick={onLoginClick} icon="exit_to_app">Login</Link>
		}else{
			loginButton = <Link className={styles.changemakerLink} onClick={onLogoutClick}
												icon="power_settings_new">Logout ({profile.name})</Link>
		}

		return loginButton
	}
}
