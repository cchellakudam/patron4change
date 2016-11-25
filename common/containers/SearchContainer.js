import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SearchActions from '../actions/SearchActions';
import { fetchNeeds } from '../utils/fetchComponentData';

import Search from '../components/Search';
import SearchResultItem from '../components/SearchResultItem';

export class SearchContainer extends Component {

	static needs = [
	];

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		results: PropTypes.object.isRequired,
		term: PropTypes.string.isRequired
	}

	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(SearchActions, props.dispatch);
	}

	componentDidMount() {
		fetchNeeds( SearchContainer.needs, this.props )
	}

	render() {
	  const {results, term} = this.props;
		
	  const nodes = results.valueSeq().map( item => {
			return <SearchResultItem
			  key={`search-result-${item.id}`}
			  changemaker={item} />;
	  });

	  return <Search title="patron4change" term={term} onSearch={this.actions.search}>
		  {nodes}
		</Search>;
	}
}

export default connect( (state/* , ownProps */) => ({
	term: state.search.term,
	results: state.cm.changemakers.filter(c => state.search.results.includes(c.id))
}) )(SearchContainer);
