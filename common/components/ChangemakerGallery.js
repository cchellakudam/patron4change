import React, { PropTypes } from 'react';

export default class ChangemakerGallery extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
