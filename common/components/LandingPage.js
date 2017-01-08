import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import * as shapes from '../constants/Shapes';
import Search from './Search';

import styles from '../../client/css/modules/landing-page.scss';

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
    let { term } = this.state;

    return <Grid className={styles.container}>
      <Row className={styles.callToActionContainer}>
        <Col xs={0} md={1} lg={2} />
        <Col xs={12} md={10} lg={8} className={styles.callToAction}>
          <Search hint="Inspirierende Changemaker finden" term={term} onSearch={this.updateTerm} />
        </Col>
        <Col xs={0} md={1} lg={2} />
      </Row>
			<Row>
        <Col xs={0} md={1} lg={1} />
        <Col xs={12} md={10} lg={10}>
          <h2 className={styles.featuredTitle}>Empfohlene Changemaker</h2>
          <SideScroller>
  				    {this.props.children}
          </SideScroller>
        </Col>
        <Col xs={0} md={1} lg={1} />
			</Row>
		</Grid>;
  }
}

export default LandingPage;
