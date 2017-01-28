import React, { Component, PropTypes } from 'react';
import UserProfile from '../components/UserProfile'
import * as UserActions from '../actions/UserActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class UserProfileContainer extends Component{

	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(UserActions, props.dispatch);
	}

	componentDidMount() {
		if (true === process.env.BROWSER) {
			debugger
			this.actions.getUserById(this.props.profile.email)
		}
	}

	render(){
		return <UserProfile
							user = {this.props.user}
							handleUpdate = {this.actions.updateUser}
						/>
	}

}

export default connect( state => ({
	isAuthenticated: state.login.isAuthenticated,
	profile: state.login.profile,
	userId: state.login.loggedUserId,
	user: state.user.user
}) )(UserProfileContainer);
