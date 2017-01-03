import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../actions/UserActions';

import Login from '../components/Login';

class LoginContainer extends React.Component {

  constructor(props) {
    super();
		this.actions = bindActionCreators(UserActions, props.dispatch);
    this.onLogin = this.onLogin.bind(this);
    this.state = { tried: false };
  }

  onLogin(credentials) {
    this.setState({ tried: true });
    this.actions.login(credentials);
  }

	render() {
    let success = this.state.tried ? Boolean(this.props.userId) : undefined;
    if (success) {
      return <div>Yay logged in!</div>;
    }
		return <Login onLogin={this.onLogin} success={success} />;
	}
}

export default connect( (state/* , ownProps */) => ({
	userId: state.app.userId
}) )(LoginContainer);
