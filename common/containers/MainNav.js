import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import { Link } from 'react-toolbox/lib/link';
import { browserHistory } from 'react-router';

import styles from '../../client/css/modules/main-nav.scss';

const Empty = () => <span></span>;

class MainNav extends React.Component {

  static propTypes = {
    userId: PropTypes.number
  }

  onNavigateToHome(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  onNavigateToSearch(e) {
    e.preventDefault();
    browserHistory.push('/search');
  }

  render() {
    const img = <img className={styles.logo} src="/public/images/logo.png" alt="patron4change logo" />;

    const { userId } = this.props;
    const currentUser = userId ? <span>Logged in as {userId}</span> : Empty;

    return <AppBar className={styles.appBar} title="&nbsp;" leftIcon={img} onLeftIconClick={this.onNavigateToHome}>
			<Navigation type='horizontal'>
        <Link href="/changemaker" className={styles.changemakerLink} onClick={this.onNavigateToSearch} icon="person">
          Meine Changemaker
        </Link>
				<Link href="/search" onClick={this.onNavigateToSearch} icon="search">
          Search
        </Link>
        <span>{currentUser}</span>
			</Navigation>
		</AppBar>;
  }
}

export default connect( (state/* , ownProps */) => ({
	userId: state.app.userId
}) )(MainNav);
