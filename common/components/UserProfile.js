import React from 'react';

import Mission from '../components/Mission';
import Updates from '../components/Updates';

class UserProfile extends React.Component {

	render() {
		return (
			<div>
				<h2>Meine Mission</h2>
				<Mission />
				<Updates />
			</div>
		);
	}
}

export default UserProfile;
