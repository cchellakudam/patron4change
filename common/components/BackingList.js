import React, { PropTypes } from 'react';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

class BackingList extends React.Component {

  static propTypes = {
    onSupport: PropTypes.func.isRequired,
    RecurringBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    OneTimeBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  }

  render() {
    return <List ripple>
      <ListSubHeader caption="patrons" />
      {this.props.RecurringBackings}
      <ListDivider />
      <ListItem caption="Diesen Changemaker unterstützen" leftIcon="send" onClick={this.props.onSupport} />
      <ListDivider />
      <ListSubHeader id="one-time-payments" caption="einmalige Unterstützungen" />
      {this.props.OneTimeBackings}
    </List>;
  }
}

export default BackingList;
