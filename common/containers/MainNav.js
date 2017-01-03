import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    const img = <a href="/" onClick={this.onNavigateToHome} title="patron for change">
      <img className={styles.logo} src="/public/images/logo.png" alt="patron4change logo" />
    </a>;
    const { userId } = this.props;
    const currentUser = userId ? <span>Logged in as {userId}</span> : Empty;
    return <AppBar title="&nbsp;" leftIcon={img}>
			<Navigation type='horizontal'>
        <Link href="/changemaker" onClick={this.onNavigateToSearch} icon="person">
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
