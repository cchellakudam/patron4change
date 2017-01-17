import React, { Component } from 'react';
import Snackbar from 'react-toolbox/lib/snackbar';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Video from 'react-html5video';
import shaka from 'shaka-player';

import Updates from '../components/Updates';
import * as shapes from '../constants/Shapes';

import styles from '../../client/css/modules/changemaker-profile.scss';

class ChangemakerProfile extends Component {

	static propTypes = {
  	changemaker: shapes.changemaker.isRequired
	};

	state = {
		videoError: false
	}

	componentDidUpdate() {
		shaka.polyfill.installAll();
		// TODO check for shaka.Player.isBrowserSupported()
		const video = this.refs.videoContainer.videoEl;
		const mpd = this.refs.videoContainer.props.mpd;
		if (mpd) {
			const player = new shaka.Player(video);
			player.load(mpd).then( () => {
				// console.log('video loaded');
			}).catch( () => {
				this.setState({ videoError: true });
			});
		}
	}

	render() {
		const cm = this.props.changemaker;
		return (
			<div>
				<Card className={styles.profileContainer}>
					<Video controls className={styles.video} ref='videoContainer' mpd={cm.videoUrl}>
						<source src="" />
					</Video>
					<Snackbar
						active={this.state.videoError}
						label='Das Video konnte nicht geladen werden'
						ref='videoSnackbar'
						type='warning' />
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
				<Updates changemaker={cm}/>
			</div>
		);
	}
}

export default ChangemakerProfile;
