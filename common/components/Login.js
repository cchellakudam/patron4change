import React, { PropTypes } from 'react';

const Empty = () => <div />;

class Login extends React.Component {

	static propTypes = {
		onLogin: PropTypes.func.isRequired,
		// if undefined, indicates that login was not attempted yet
		success: PropTypes.bool
	}

	render() {
		const { onLogin, success } = this.props;
		return (
			<div>
				<button onClick={onLogin}>Login</button>
				{false === success ? <div>Invalid credentials</div> : Empty}
			</div>
		);
	}
}

export default Login;
