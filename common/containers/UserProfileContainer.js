import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as ChangemakerActions from '../actions/ChangemakerActions';
import UserProfile from '../components/UserProfile';
import { fetchNeeds } from '../utils/fetchComponentData';

class UserProfileContainer extends Component {

	static needs = [
		ChangemakerActions.getChangemakerById
	];

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		params: PropTypes.object.isRequired,
		changemaker: PropTypes.object.isRequired
	}

	componentDidMount() {
		fetchNeeds( UserProfileContainer.needs, this.props )
	}

	render() {
		const { changemaker } = this.props;
		return <UserProfile changemaker={changemaker} />;
	}
}

export default connect( state => ({
	changemaker: state.cm.changemaker
}) )(UserProfileContainer);
