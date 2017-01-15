import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Video from 'react-html5video';

import Updates from '../components/Updates';
import BackingList from '../components/BackingList';
import * as shapes from '../constants/Shapes';

import { Row, Col } from 'react-flexbox-grid';
import styles from '../../client/css/modules/changemaker-profile.scss';

class ChangemakerProfile extends React.Component {

	static propTypes = {
  	changemaker: shapes.changemaker.isRequired,
    RecurringBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    OneTimeBackings: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
		onSupport: PropTypes.func.isRequired
	};

	render() {
		const cm = this.props.changemaker;
		// TODO actually compute the patron count
		return (
			<div>
				<Row>
					<Col xs={12} md={12} lg={12}>
						<Card className={styles.profileContainer}>
							<Video controls className={styles.video}>
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
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6} lg={6}>
						<BackingList
							RecurringBackings={this.props.RecurringBackings}
							OneTimeBackings={this.props.OneTimeBackings}
							onSupport={this.props.onSupport}>
						</BackingList>
					</Col>
					<Col xs={12} md={6} lg={6}>
						<Updates changemaker={cm}/>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ChangemakerProfile;
