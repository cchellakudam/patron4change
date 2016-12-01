import React, { PropTypes } from 'react';
import { Input } from 'react-toolbox/lib/input';

let styles = {};
if ('browser' === process.env.APP_ENV) {
  styles = require('../../client/css/modules/search.scss');
}

class Search extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object
  }

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(newVal) {
    let { onSearch } = this.props;
    onSearch(newVal);
  }

  render() {
    let { term } = this.props;
    return <Input id="search-term" className={styles.searchTerm} hint='Suche nach Changemakern'
      type="text" value={term} icon="search"
      onChange={this.onChange} />;
  }
}

Search.propTypes = {
  term: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Search;
