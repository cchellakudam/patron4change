import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class SearchResultItem extends React.Component {

  static propTypes = {

  	changemaker: PropTypes.shape({
      id: PropTypes.string.isRequired,
  		name: PropTypes.string.isRequired,
  		image: PropTypes.string.isRequired,
  		isBackedByMe: PropTypes.bool.isRequired
  	}).isRequired

  }

  render() {
    let cm = this.props.changemaker;
    return <div className="search-result-item">
      <img alt="user thumbnail" src={cm.image} />
      <h4>{cm.name}</h4>
      <Link to={`/${cm.id}`}>Profil ansehen</Link>
    </div>;
  }
}

export default SearchResultItem;
