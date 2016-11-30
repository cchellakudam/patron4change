import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {ListItem} from 'react-toolbox/lib/list';

class SearchResultItem extends React.Component {

  static propTypes = {

  	changemaker: PropTypes.shape({
      id: PropTypes.string.isRequired,
  		name: PropTypes.string.isRequired,
  		image: PropTypes.string.isRequired,
  		isBackedByMe: PropTypes.bool.isRequired
  	}).isRequired

  }

  render() {
    let cm = this.props.changemaker;
    return <ListItem
      avatar={cm.image}
      caption={cm.name}
      legend="Last update 30.11.2016"
      to={`/changemaker/${cm.id}`}
      ripple
      selectable
      {...this.props}
    />;
  }
}

export default SearchResultItem;
