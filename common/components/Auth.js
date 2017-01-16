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
		<ul className="list-inline">
			<li><img src={profile.picture} height="40px" /></li>
			<li><span>Welcome, {profile.nickname}</span></li>
		<li><button className="btn btn-primary" onClick={onLogoutClick}>Logout</button></li>
			</ul>
		)}
	</div>
	)
	}
}
