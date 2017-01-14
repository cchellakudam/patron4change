import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-toolbox/lib/button';
const { Row } = require('react-flexbox-grid');

import styles from '../../client/css/modules/landing-page.scss';

export default class LandingPage extends React.Component {

  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return <div className={styles.container}>
      <Row className={styles.callToAction}>
        <Button label="Changemaker finden, Patron werden"
          raised accent
          className={styles.becomeChangemakerButton} />
      </Row>
      <Row className={styles.callToAction}>
        {/* TODO move this to some other place and change styling */}
        <Button label="Changemaker werden"
          raised accent
          className={styles.becomeChangemakerButton}
          onClick={browserHistory.push.bind(this, '/changemaker/new')} />
      </Row>
			<Row>
				{this.props.children}
			</Row>
		</div>;
  }
}
