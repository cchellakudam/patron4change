import React, { PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

import styles from '../../client/css/modules/backing-list.scss';

class BackingList extends React.Component {

  static propTypes = {
    onSupport: PropTypes.func.isRequired,
    recipientName: PropTypes.string.isRequired,
    RecurringBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    OneTimeBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  }

  render() {
    let { recipientName } = this.props;
    return <List className={styles.list} ripple>
      <Button primary raised className={styles.supportBtn}
        label="Diesen Changemaker unterstützen"
        icon="send" onClick={this.props.onSupport} />
      <ListSubHeader caption={`${recipientName}'s patrons`} />
      {this.props.RecurringBackings}
      <ListDivider />
      <ListSubHeader id="one-time-payments" caption="einmalige Unterstützungen" />
      {this.props.OneTimeBackings}
    </List>;
  }
}

export default BackingList;
