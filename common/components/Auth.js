import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/LoginActions'

class Login extends Component{

	 static propTypes = {
		onLoginClick: PropTypes.func.isRequired,
		errorMessage: PropTypes.string
	}

	constructor(props, context){
	 	super(props, context);
	 	this.actions = bindActionCreators(LoginActions, props.dispatch)
	}

	render() {
		const { errorMessage } = this.props

		return (
			<div>
			<input type='text' ref='username' className="form-control" style= placeholder='Username'/>
			<input type='password' ref='password' className="form-control" style= placeholder='Password'/>
			<button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
			Login
			</button>

			{errorMessage &&
			<p style=>{errorMessage}</p>
			}
			</div>
		)
	}

	handleClick(event) {
		const username = this.refs.username
		const password = this.refs.password
		const creds = { username: username.value.trim(), password: password.value.trim() }
		this.props.onLoginClick(creds)
	}

}

export default connect((state) => {

})
