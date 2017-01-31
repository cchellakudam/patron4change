/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React from 'react';
import * as SupportChangemakerActions from '../actions/SupportChangemakerActions'
import { bindActionCreators } from 'redux';
import { fetchNeeds } from '../utils/fetchComponentData';
import ActionStatus from '../components/ActionStatus';
import {browserHistory} from 'react-router'
import CardRegistration from '../components/CardRegistration'

import { connect } from 'react-redux';

class CardRegistrationContainer extends React.Component {
	constructor(props){
		super(props)
		this.actions = bindActionCreators(SupportChangemakerActions, props.dispatch);
	}

	render() {debugger
		let message = null;
		let status = null
		let statusMessage = null;

		if(this.props.error){
			message = 'Ihre Karte war nicht erfolgreich registriert';
			status = 'failure'
			statusMessage = <ActionStatus
				message={message}
				status={status}
			/>
		}

		return (
			<section>
				{statusMessage}
				<CardRegistration/>
			</section>
		)
	}

}

export default connect( (state) => ({
	isAuthenticated: state.login.isAuthenticated,
	userId: state.login.loggedUserId,

}) )(CardRegistrationContainer);
