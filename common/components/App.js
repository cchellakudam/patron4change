import React, { Component, PropTypes } from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {Navigation} from 'react-toolbox/lib/navigation';

import 'react-toolbox/lib/commons.scss';

export default class App extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired,
	};

	static propTypes = {
		main: PropTypes.element.isRequired,
		sub: PropTypes.element
	}

	render() {
		let nodes = <div>
			<AppBar title='patron4change'>
				<Navigation type='horizontal'>
					<span>Changemaker</span>
				</Navigation>
			</AppBar>
			{this.props.main}
			{this.props.sub}
		</div>;
		return nodes;
	}
}
