import React, { PropTypes } from 'react';
import { List } from 'react-toolbox/lib/list';

import styles from '../../client/css/modules/search-result.scss';

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
