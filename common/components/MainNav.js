import React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import { Link } from 'react-toolbox/lib/link';
import { browserHistory } from 'react-router';

import styles from '../../client/css/modules/main-nav.scss';

export default class MainNav extends React.Component {

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
    return <AppBar title="&nbsp;" leftIcon={img}>
			<Navigation type='horizontal'>
        <Link href="/changemaker" onClick={this.onNavigateToSearch} icon="person">
          Meine Changemaker
        </Link>
				<Link href="/search" onClick={this.onNavigateToSearch} icon="search">
          Search
        </Link>
			</Navigation>
		</AppBar>;
  }
}
