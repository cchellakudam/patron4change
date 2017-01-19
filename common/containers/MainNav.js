import React from 'react';
import { connect } from 'react-redux';

import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import { Link } from 'react-toolbox/lib/link';
import { browserHistory } from 'react-router';
import Auth from '../components/Auth.js'
import styles from '../../client/css/modules/main-nav.scss';
import * as LoginActions from '../actions/AuthActions'
import { bindActionCreators } from 'redux';

class MainNav extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(LoginActions, props.dispatch);
  }

  componentWillMount(){
		if (true === process.env.BROWSER) {
			this.actions.doAuthentication();
		}

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

    let isStartPage = '/' === this.props.location.pathname;

    return <AppBar className={`${styles.appBar} ${isStartPage ? styles.startAppBar : ''}`}
      title="&nbsp;" leftIcon={img} onLeftIconClick={this.onNavigateToHome}>
			<Navigation type='horizontal'>
				<Auth
					isAuthenticated = {this.props.isAuthenticated}
					profile = {this.props.profile}
					onLoginClick={this.actions.login}
					onLogoutClick = {this.actions.logout}
					doAuthenticate = {this.actions.doAuthentication}
				/>
        <Link href="/changemaker" className={styles.changemakerLink} onClick={this.onNavigateToSearch} icon="person">
          Meine Changemaker
        </Link>
				<Link href="/search" onClick={this.onNavigateToSearch} icon="search">
          Search
        </Link>

			</Navigation>
		</AppBar>;
  }
}

export default connect( (state) => ({
	isAuthenticated: state.login.isAuthenticated,
	profile: state.login.profile,
	loginData: state.login.loginData,
	userId: state.login.loggedUserId
}) )(MainNav);
