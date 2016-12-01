import React from 'react';
import { List } from 'react-toolbox/lib/list';

let styles = {};
if ('browser' === process.env.APP_ENV) {
  styles = require('../../client/css/modules/search-result.scss');
}

class SearchResult extends React.Component {

  render() {
    let cm = this.props.changemaker;
    return <List className={styles.resultList} ripple>
      {this.props.children}
    </List>;
  }
}

export default SearchResult;
