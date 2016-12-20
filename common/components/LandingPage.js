import React, { PropTypes } from 'react';
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
			<Row>
				{this.props.children}
			</Row>
		</div>;
  }
}
