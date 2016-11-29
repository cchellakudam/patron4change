import React, {PropTypes} from 'react';
import {Button} from 'react-toolbox/lib/button';
import {Link} from 'react-router';

let styles = {};
if (process.env.BROWSER) {
  styles = require('../../client/css/modules/changemaker-gallery-item.scss');
}

class ChangemakerGalleryItem extends React.Component {

  static propTypes = {

  	changemaker: PropTypes.shape({
      id: PropTypes.string.isRequired,
  		name: PropTypes.string.isRequired,
  		image: PropTypes.string.isRequired,
  		isBackedByMe: PropTypes.bool.isRequired
  	}).isRequired,

  	onSupport: PropTypes.func.isRequired
  }

  render() {
  	const cm = this.props.changemaker;
  	return (
  		<div className={styles.container}>
  			<img alt="user thumbnail" src={cm.image} />
  			<h4>{cm.name}</h4>
  			<Button
          onClick={this.props.onSupport}
          disabled={cm.isBackedByMe}>
          {cm.isBackedByMe ? 'is supported' : 'support'}
  			</Button>
  			<Link to={`/${cm.id}`}>details</Link>
  		</div>
  	);
  }
}

export default ChangemakerGalleryItem;
