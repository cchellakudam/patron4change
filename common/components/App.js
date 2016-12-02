import React, { Component, PropTypes } from 'react';
import 'react-toolbox/lib/commons.scss';

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
		let nodes = <div>
			{this.props.nav}
			{this.props.main}
			{this.props.sub}
		</div>;
		return nodes;
	}
}
