import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SearchResult from '../components/SearchResult';
import SearchResultItem from '../components/SearchResultItem';

export class SearchResultContainer extends React.Component {

  static propTypes = {
		dispatch: PropTypes.func.isRequired,
    results: PropTypes.object.isRequired
  }

  render() {
    let { results } = this.props;

	  const nodes = results.valueSeq().map( item => {
			return <SearchResultItem
			  key={`search-result-${item.id}`}
        className="search-result-item"
			  changemaker={item} />;
	  });

    return <SearchResult>
      {nodes}
    </SearchResult>;
  }
}

export default connect( (state/* , ownProps */) => ({
	results: state.cm.changemakers.filter(c => state.search.results.includes(c.id))
}) )(SearchResultContainer);
