import React, { PropTypes } from 'react';

export default class ChangemakerGallery extends React.Component {

  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return <div className="changemaker-gallery">
      {this.props.children}
    </div>;
  }
}
