import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LandingPage from '../components/LandingPage';
import ChangemakerCard from '../components/ChangemakerCard';
import * as ChangemakerActions from '../actions/ChangemakerActions';
import { fetchNeeds } from '../utils/fetchComponentData';

class LandingPageContainer extends Component {

	static needs = [
		ChangemakerActions.getFeaturedChangemakers
	];

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		changemakers: PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(ChangemakerActions, props.dispatch);
	}

	componentDidMount() {
		fetchNeeds( LandingPageContainer.needs, this.props )
	}

	render() {
	  const {changemakers} = this.props;

	  const nodes = changemakers.valueSeq().map( cm => {
			return <ChangemakerCard
			  key={`cm-${cm.id}`}
			  changemaker={cm}
			  onSupport={() => this.actions.supportChangemaker(cm.id)} />
	  });

	  return <LandingPage>
		  {nodes}
		</LandingPage>;
	}
}

export default connect( (state/* , ownProps */) => ({
	changemakers: state.cm.changemakers
}) )(LandingPageContainer);
