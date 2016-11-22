import React, { Component, PropTypes } from 'react';

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
			{this.props.main}
			{this.props.sub}
		</div>;
		return nodes;
	}
}
