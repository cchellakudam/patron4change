import React, { Component, PropTypes } from 'react';
import 'react-toolbox/lib/commons.scss';
import styles from '../../client/css/modules/app.scss';
const {Grid, Row, Col} = require('react-flexbox-grid');

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
		return (
			<div>
				{this.props.nav}
				<Grid fluid className={styles.appGrid}>
					<Row>
						<Col xs={0} lg={2}></Col>
						<Col xs={12} lg={8}>{this.props.main}</Col>
						<Col xs={0} lg={2}></Col>
					</Row>
					<Row>
						<Col xs={0} lg={2}></Col>
						<Col xs={12} lg={8}>{this.props.sub}</Col>
						<Col xs={0} lg={2}></Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
