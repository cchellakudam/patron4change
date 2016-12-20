import React, { Component, PropTypes } from 'react';

import Mission from '../components/Mission';
import Updates from '../components/Updates';

class UserProfile extends Component {

	static propTypes = {
  	changemaker: PropTypes.object.isRequired
	};

	render() {
		const cm = this.props.changemaker;
		return (
			<div>
				<h2>Meine Mission</h2>
				<Mission changemaker={cm} />
				<Updates />
			</div>
		);
	}
}

export default UserProfile;
