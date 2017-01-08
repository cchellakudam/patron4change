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
		featuredChangemakers: PropTypes.any.isRequired,
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
	  const {featuredChangemakers, userId} = this.props;

	  const nodes = featuredChangemakers.map( cm => {
			return <ChangemakerCard
			  key={`cm-${cm.id}`}
			  changemaker={cm}
				showSupport={false}
				showAvatar={false}
			  onSupport={() => this.actions.supportChangemaker(cm.id)} />
	  });

		const Wrapper = 'number' === typeof userId ? Startpage : LandingPage;

	  return <Wrapper>
		  {nodes}
		</Wrapper>;
	}
}

export default connect( (state/* , ownProps */) => ({
	featuredChangemakers: state.cm.changemakers.filter(c => state.cm.featuredChangemakers.valueSeq().includes(c.id)),
	userId: state.app.userId
}) )(LandingPageContainer);
