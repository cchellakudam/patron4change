import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Video from 'react-html5video';

// import Updates from '../components/Updates';
import * as shapes from './shapes';

import styles from '../../client/css/modules/changemaker-profile.scss';

class ChangemakerProfile extends Component {

	static propTypes = {
  	changemaker: shapes.changemaker.isRequired
	};

	render() {
		const cm = this.props.changemaker;
		return (
			<Card className={styles.profileContainer}>
				<Video autoPlay muted className={styles.video}>
					<source src="https://videos.whatchado.com/ina-pervan-al_soqauer-mp4-medium-582b13b426bb8.mp4"
						type="video/mp4" />
				</Video>
				<div className={styles.profileContent}>
					<CardTitle
						title={`${cm.user.firstName} ${cm.user.lastName}`}
						subtitle={`${Math.floor(Math.random() * 100 + 3).toFixed(0)} regular patrons |
						${Math.floor(Math.random() * 100 + 3).toFixed(0)} one-time patrons`}
						avatar={cm.user.avatarUrl} />
					<CardText className={styles.mission}>
	        	<p>{cm.mission.text}</p>
		      </CardText>
				</div>
			</Card>
		);
	}
}

export default ChangemakerProfile;
