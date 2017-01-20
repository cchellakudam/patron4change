import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';

import * as shapes from '../constants/Shapes';

import styles from '../../client/css/modules/update.scss';

class Update extends Component {

  static propTypes = {
    update: shapes.update.isRequired
  };

	render() {
    const update = this.props.update;
		return (
			<Card className={styles.card}>
        <CardTitle
          title={update.title}
          subtitle={update.createdAt} />
        <CardText>
          {update.content? update.content.text : ''}
        </CardText>
      </Card>
		);
	}
}

export default Update;
