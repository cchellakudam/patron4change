import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LandingPage from '../components/LandingPage';
import Startpage from '../components/Startpage';

import ChangemakerCard from '../components/ChangemakerCard';
import * as ChangemakerActions from '../actions/ChangemakerActions';
import { fetchNeeds } from '../utils/fetchComponentData';

class LandingPageContainer extends Component {

	static needs = [
		ChangemakerActions.getFeaturedChangemakers
	];

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		changemakers: PropTypes.object.isRequired,
		userId: PropTypes.number
	}

	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(ChangemakerActions, props.dispatch);
	}

	componentDidMount() {
		fetchNeeds( LandingPageContainer.needs, this.props )
	}

	render() {
	  const {changemakers, userId} = this.props;

	  const nodes = changemakers.valueSeq().map( cm => {
			return <ChangemakerCard
			  key={`cm-${cm.id}`}
			  changemaker={cm}
			  onSupport={() => this.actions.supportChangemaker(cm.id)} />
	  });

		const Wrapper = 'number' === typeof userId ? Startpage : LandingPage;

	  return <Wrapper>
		  {nodes}
		</Wrapper>;
	}
}

export default connect( (state/* , ownProps */) => ({
	changemakers: state.cm.changemakers,
	userId: state.app.userId
}) )(LandingPageContainer);
