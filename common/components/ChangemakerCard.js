import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
const {Col} = require('react-flexbox-grid');

import * as Shapes from '../constants/Shapes';

import styles from '../../client/css/modules/changemaker-card.scss';

class ChangemakerCard extends React.Component {

  static propTypes = {
  	changemaker: Shapes.changemaker.isRequired,
  	onSupport: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.onNavigateToDetails = this.onNavigateToDetails.bind(this);
    this.onNavigateToSupport = this.onNavigateToSupport.bind(this);
  }

  onNavigateToDetails(e) {
    e.preventDefault();
    const { id } = this.props.changemaker;
    browserHistory.push(`/changemaker/${id}`);
  }

  onNavigateToSupport(e) {
    e.preventDefault();
    const { id } = this.props.changemaker;
    browserHistory.push(`/changemaker/${id}/support`);
  }

  render() {
  	const cm = this.props.changemaker;

    const topics = ['nature', 'sea'];
    let topicIdx = Math.floor(Math.random() * topics.length - 0.01);

  	return <Col lg={3} md={4} sm={6} xs={12}>
      <Card className={styles.item}>
		    <CardMedia
		      aspectRatio="wide"
		      image={`https://placeimg.com/800/450/${topics[topicIdx]}`} />
		    <CardTitle
          title={cm.name}
          subtitle={`${Math.floor(Math.random() * 200 + 50).toFixed(0)} patrons`}
          avatar={cm.avatarUrl} />
		    <CardText className={styles.text}>
          <p className={styles.textContent}>{cm.mission}</p>
          <p className={styles.readMore}></p>
        </CardText>
		    <CardActions>
		      <Button label="mehr erfahren" icon="info_outline" onClick={this.onNavigateToDetails} />
		      <Button label="unterstützen" icon="star_border" onClick={this.onNavigateToSupport} />
		    </CardActions>
		  </Card>
    </Col>;
  }
}

export default ChangemakerCard;
