import React, { Component, PropTypes } from 'react';

if ( 'undefined' !== typeof window ) {
	require( '../../client/assets/css/main.css' );
}

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
