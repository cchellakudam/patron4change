import React, { PropTypes } from 'react';
import { Input } from 'react-toolbox/lib/input';

import styles from '../../client/css/modules/search.scss';
import theme from '../../client/css/theme/search.scss';

class Search extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
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
    return <Input id="search-term" className={styles.searchTerm}
      type="text"
      value={term}
      icon="search"
      maxLength={128} // validate max length to avoid long searches due to pasted input
      theme={theme}
      onChange={this.onChange}
      hint={this.props.hint} />;
  }
}

Search.propTypes = {
  term: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Search;
