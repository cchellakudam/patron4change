import React, { Component, PropTypes } from 'react'
import { Link } from 'react-toolbox/lib/link';
import styles from '../../client/css/modules/main-nav.scss';


export default class Auth extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props
		return (
			<div style={{ marginTop: '10px' }}>
		{ !isAuthenticated ? (
		<Link className={styles.changemakerLink} onClick={onLoginClick} icon="person">
			Login
		</Link>
		) : (
		<Link className={styles.changemakerLink} onClick={onLogoutClick} icon="person">
			Logout ({profile.name})
			</Link>
		)}
	</div>
	)
	}
}
