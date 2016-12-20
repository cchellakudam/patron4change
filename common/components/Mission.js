import React from 'react';

import * as shapes from './shapes';

class Mission extends React.Component {

	static propTypes = {
  	changemaker: shapes.changemaker.isRequired
	};

	render() {
		const cm = this.props.changemaker;
		return <p>{cm.mission.text}</p>;
	}
}

export default Mission;
