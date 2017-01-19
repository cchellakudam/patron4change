import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as ChangemakerActions from '../actions/ChangemakerActions';
import ChangemakerProfile from '../components/ChangemakerProfile';
import BackingItem from '../components/BackingItem';
import { fetchNeeds } from '../utils/fetchComponentData';

export class ChangemakerProfileContainer extends Component {

	static needs = [
		ChangemakerActions.getChangemakerById,
		ChangemakerActions.getBackings
	];

	constructor() {
		super();
		this.onSupport = this.onSupport.bind(this);
	}

	componentDidMount() {
		fetchNeeds( ChangemakerProfileContainer.needs, this.props )
	}

	onSupport() {
		const { id } = this.props.changemaker;
    browserHistory.push(`/changemaker/${id}/support`);
	}

	render() {
		const { changemaker, backings, error, userId } = this.props;
		const changemakerIsEmpty = _.isEmpty(changemaker || {});

		if (changemakerIsEmpty && 0 < +userId) {
			browserHistory.push('/changemaker/new');
		}

		if (changemakerIsEmpty) {
			return <div>LOADING</div>;
		}

		if (error) {
			return <div>{String(error)}</div>;
		}

		const renderBacking = b => {
			return <BackingItem key={b.id} backing={b} />;
		};

		const recurring = backings.filter(b => 'recurring' === b.type).map(renderBacking);
		const oneTime   = backings.filter(b => 'one-time' === b.type).map(renderBacking);
		return <ChangemakerProfile
			changemaker={changemaker}
			RecurringBackings={recurring}
			OneTimeBackings={oneTime}
		  onSupport={this.onSupport} />;
	}
}

export default connect( state => ({
	changemaker: state.cm.changemaker,
	backings: state.cm.backings,
	error: state.cm.error,
	userId: state.login.loggedUserId
}) )(ChangemakerProfileContainer);
