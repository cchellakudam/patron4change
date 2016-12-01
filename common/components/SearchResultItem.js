import React from 'react';
import {ListItem} from 'react-toolbox/lib/list';
import * as shapes from './shapes';

class SearchResultItem extends React.Component {

  static propTypes = {
  	changemaker: shapes.changemaker.isRequired
  }

  render() {
    let cm = this.props.changemaker;
    let name = `${cm.firstName} ${cm.lastName}`;
    return <ListItem
      avatar={cm.image}
      caption={name}
      legend={cm.mission}
      to={`/changemaker/${cm.id}`}
      ripple
      selectable
      {...this.props}
    />;
  }
}

export default SearchResultItem;
