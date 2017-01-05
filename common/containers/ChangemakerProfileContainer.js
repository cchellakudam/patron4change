import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as ChangemakerActions from '../actions/ChangemakerActions';
import ChangemakerProfile from '../components/ChangemakerProfile';
import { fetchNeeds } from '../utils/fetchComponentData';

class ChangemakerProfileContainer extends Component {

	static needs = [
		ChangemakerActions.getChangemakerById
	];

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		params: PropTypes.object.isRequired,
		changemaker: PropTypes.object.isRequired
	}

	componentDidMount() {
		fetchNeeds( ChangemakerProfileContainer.needs, this.props )
	}

	render() {
		const { changemaker } = this.props;
		return <ChangemakerProfile changemaker={changemaker} />;
	}
}

export default connect( state => ({
	changemaker: state.cm.changemaker
}) )(ChangemakerProfileContainer);
