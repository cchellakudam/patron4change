import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangemakerGallery from '../components/ChangemakerGallery';
import ChangemakerGalleryItem from '../components/ChangemakerGalleryItem';
import * as ChangemakerActions from '../actions/ChangemakerActions';
import { fetchNeeds } from '../utils/fetchComponentData';

class ChangemakerGalleryContainer extends Component {

	static needs = [
		ChangemakerActions.readAll
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
		fetchNeeds( ChangemakerGalleryContainer.needs, this.props )
	}

	render() {
	  const {changemakers} = this.props;

	  const nodes = changemakers.valueSeq().map( cm => {
			return <ChangemakerGalleryItem
			  key={`cm-${cm.id}`}
			  changemaker={cm}
			  onSupport={() => this.actions.supportChangemaker(cm.id)} />
	  });

	  return <ChangemakerGallery title="patron4change">
		  {nodes}
		</ChangemakerGallery>;
	}
}

export default connect( (state/* , ownProps */) => ({
	changemakers: state.cm.changemakers
}) )(ChangemakerGalleryContainer);
