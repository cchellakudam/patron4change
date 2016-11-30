import React, { Component, PropTypes } from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {Navigation} from 'react-toolbox/lib/navigation';

import 'react-toolbox/lib/commons.scss';

export default class App extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired,
	};

	static propTypes = {
		nav: PropTypes.element.isRequired,
		main: PropTypes.element.isRequired,
		sub: PropTypes.element
	}

	render() {
		let nodes = <div>
			<AppBar title='patron4change'>
				<Navigation type='horizontal'>
					<span>Changemaker</span>
					<span>Search</span>
					{this.props.nav}
				</Navigation>
			</AppBar>
			{this.props.main}
			{this.props.sub}
		</div>;
		return nodes;
	}
}
