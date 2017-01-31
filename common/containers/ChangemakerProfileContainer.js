import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as ChangemakerActions from '../actions/ChangemakerActions';
import ChangemakerProfile from '../components/ChangemakerProfile';
import BackingItem from '../components/BackingItem';
import StatusUpdate from '../components/StatusUpdate';
import { fetchNeeds } from '../utils/fetchComponentData';

export class ChangemakerProfileContainer extends Component {

	static needs = [
		ChangemakerActions.getChangemakerById,
		ChangemakerActions.getBackings,
		ChangemakerActions.getUpdates
	];

	constructor(props) {
		super();
		this.onSupport = this.onSupport.bind(this);
	}

	componentDidMount() {
		fetchNeeds( ChangemakerProfileContainer.needs, this.props )
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.params.changemakerId !== nextProps.params.changemakerId) {
			fetchNeeds( ChangemakerProfileContainer.needs, nextProps );
		}
	}

	onSupport() {
		const { id } = this.props.changemaker;
    browserHistory.push(`/changemaker/${id}/support`);
	}

	render() {
		const { changemaker, backings, updates, error } = this.props;

		if (_.isEmpty(changemaker || {})) {
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
		const updateElems = updates.map(u => <StatusUpdate key={u.id} update={u} />);

		return <ChangemakerProfile
			changemaker={changemaker}
			RecurringBackings={recurring}
			OneTimeBackings={oneTime}
			StatusUpdates={updateElems}
		  onSupport={this.onSupport} />;
	}
}

export default connect( state => ({
	// cache bust
	changemakerId: state.cm.changemaker ? state.cm.changemaker.id : null,

	// used data
	changemaker: state.cm.changemaker,
	backings: state.cm.backings,
	updates: state.cm.updates,
	error: state.cm.error,
	userId: state.login.loggedUserId
}) )(ChangemakerProfileContainer);
