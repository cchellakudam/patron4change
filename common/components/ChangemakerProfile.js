import React, { PropTypes } from 'react';
import Snackbar from 'react-toolbox/lib/snackbar';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Video from 'react-html5video';
import shaka from 'shaka-player';

import UpdateList from '../components/UpdateList';
import BackingList from '../components/BackingList';
import * as shapes from '../constants/Shapes';

import { Row, Col } from 'react-flexbox-grid';
import styles from '../../client/css/modules/changemaker-profile.scss';

class ChangemakerProfile extends React.Component {

	static propTypes = {
  	changemaker: shapes.changemaker.isRequired,
    RecurringBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    OneTimeBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
		StatusUpdates: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
		onSupport: PropTypes.func.isRequired
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
				<Row>
					<Col xs={12} md={12} lg={12}>
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
									subtitle={`${cm.numberOfPatrons} patrons`}
									avatar={cm.user.avatarUrl} />
								<CardText className={styles.mission}>
				        	<p>{cm.mission.text}</p>
					      </CardText>
							</div>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6} lg={6}>
						<BackingList
							changemaker={cm}
							RecurringBackings={this.props.RecurringBackings}
							OneTimeBackings={this.props.OneTimeBackings}
							onSupport={this.props.onSupport}>
						</BackingList>
					</Col>
					<Col xs={12} md={6} lg={6}>
						<UpdateList>
							{this.props.StatusUpdates}
						</UpdateList>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ChangemakerProfile;
