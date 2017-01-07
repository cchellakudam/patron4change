import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import * as shapes from '../constants/Shapes';
import Search from './Search';

import styles from '../../client/css/modules/landing-page.scss';
import ChangemakerCard from './ChangemakerCard';

class SideScroller extends React.Component {

  static propTypes = {
    children: shapes.children.isRequired
  }

  render() {
    let wrappedChildren = React.Children.map(this.props.children, child => {
      return <div className={styles.sideScrollerItem}>{child}</div>;
    });
    return <div className={styles.sideScroller}>
      {wrappedChildren}
    </div>;
  }
}

class LandingPage extends React.Component {

  static propTypes = {
    children: PropTypes.object
  }

  constructor() {
    super();
    this.updateTerm = this.updateTerm.bind(this);
    this.state = { term: '' };
  }

  updateTerm(term) {
    this.setState({ term });
  }

  render() {
    const cm = {
      id: 2,
      name: 'Marcel Zeilinger',
      firstName: 'Marcel',
      lastName: 'Zeilinger',
      mission: 'blabla',
      avatarUrl: 'http://example.com',
      statusUpdates: Immutable.List()
    };
    let { term } = this.state;
    return <Grid className={styles.container}>
      <Row className={styles.callToAction}>
        <Col xs={0} md={2} lg={2} />
        <Col xs={12} md={10} lg={10}>
          <Search hint="Inspirierende Changemaker finden" term={term} onSearch={this.updateTerm} />
        </Col>
        <Col xs={0} md={2} lg={2} />
      </Row>
			<Row>
        <Col xs={12} md={10} lg={10}>
          <h2 className={styles.featuredTitle}>Empfohlene Changemaker</h2>
          <SideScroller>
  				    <ChangemakerCard changemaker={cm} onSupport={() => {}} />
  				    <ChangemakerCard changemaker={cm} onSupport={() => {}} />
  				    <ChangemakerCard changemaker={cm} onSupport={() => {}} />
          </SideScroller>
        </Col>
			</Row>
		</Grid>;
  }
}

export default LandingPage;
