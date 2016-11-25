import React, { PropTypes } from 'react';

class Search extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object
  }

  constructor() {
    super();
  }

  render() {
    let { term, onSearch } = this.props;
    return <div>
      <input id="search-term" type="text" value={term} onChange={e => onSearch(e.target.value)} />
      {this.props.children}
    </div>;
  }
}

Search.propTypes = {
  term: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Search;
