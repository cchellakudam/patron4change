import React, { Component, PropTypes } from 'react';
import 'react-toolbox/lib/commons.scss';

import '../../client/css/theme/app.scss';

export default class App extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	static propTypes = {
		nav: PropTypes.element.isRequired,
		main: PropTypes.element.isRequired,
		sub: PropTypes.element
	}

	render() {
		return <div>
			{this.props.nav}
			<main>{this.props.main}</main>
			{this.props.sub}
		</div>;
	}
}
