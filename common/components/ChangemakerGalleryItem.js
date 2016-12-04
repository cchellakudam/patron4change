import React, {PropTypes} from 'react';
import {Button} from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
const {Col} = require('react-flexbox-grid');

import * as shapes from './shapes';

import styles from '../../client/css/modules/changemaker-gallery-item.scss';

class ChangemakerGalleryItem extends React.Component {

  static propTypes = {
  	changemaker: shapes.changemaker.isRequired,
  	onSupport: PropTypes.func.isRequired
  }

  render() {
  	const cm = this.props.changemaker;

  	return (
		<Col lg={3} md={4} sm={6} xs={12}><Card className={styles.changemakerGalleryItem}>
		    <CardMedia
		      aspectRatio="wide"
		      image="https://placeimg.com/800/450/nature"
		    />
		    <CardTitle
		      title={cm.name}

		    />
		    <CardText style={{height: '7rem', 'text-align':'left'}}>{cm.mission}</CardText>
		    <CardActions>
		      <Button label="details" />
		      <Button label="support" />
		    </CardActions>
		  </Card></Col>
  	);
  }
}

export default ChangemakerGalleryItem;
