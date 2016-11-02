import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class ChangemakerGalleryItem extends React.Component {

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
  		<div>
  			<img alt="user thumbnail" src={cm.image} />
  			<h4>{cm.name}</h4>
  			<button
          onClick={this.props.onSupport}
          disabled={cm.isBackedByMe ? 'disabled' : ''}>
          {cm.isBackedByMe ? 'is supported' : 'support'}
  			</button>
  			<Link to={`/${cm.id}`}>details</Link>
  		</div>
  	);
  }
}
