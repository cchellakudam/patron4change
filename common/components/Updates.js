import React, { Component } from 'react';

import * as shapes from '../constants/Shapes';
import Update from './Update';

class Updates extends Component {

	static propTypes = {
  	changemaker: shapes.changemaker.isRequired
	};

	render() {
		const { changemaker } = this.props;
		const nodes = changemaker.statusUpdates.map( item => {
			return <Update update={item} />;
	  });

		return (
			<div>
				{nodes}
			</div>
		);
	}
}

export default Updates;
