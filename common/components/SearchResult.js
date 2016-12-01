import React, { PropTypes } from 'react';
import { List } from 'react-toolbox/lib/list';

let styles = {};
if ('browser' === process.env.APP_ENV) {
  styles = require('../../client/css/modules/search-result.scss');
}

class SearchResult extends React.Component {

  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return <List className={styles.resultList} ripple>
      {this.props.children}
    </List>;
  }
}

export default SearchResult;
