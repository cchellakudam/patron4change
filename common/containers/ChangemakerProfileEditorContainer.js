import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ChangemakerActions from '../actions/ChangemakerActions';
import { changemaker as Changemaker } from '../constants/Shapes';

import ChangemakerProfileEditor from '../components/ChangemakerProfileEditor';

class ChangemakerProfileEditorContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
		changemaker: PropTypes.object,
    videoUrl: PropTypes.string // TODO remove (see Types.js)
	}

  state = { saved: false };

  constructor(props) {
    super();
		this.actions = bindActionCreators(ChangemakerActions, props.dispatch);
  }

  onSave(changemaker) {
    this.setState({ saved: true });
    // TODO refactor
    let cm = changemaker;
    if (this.props.videoUrl) {
      cm = cm.set('videoUrl', this.props.videoUrl);
    }
    this.actions.saveChangemaker(cm);
  }

  onChangeVideoFile(file) {
    this.actions.uploadVideo(file);
  }

  componentDidUpdate() {
    if (this.state.saved && this.props.changemaker.id) {
      browserHistory.push(`/changemaker/${this.props.changemaker.id}`);
    }
  }

  render() {
    let { changemaker } = this.props;
    if (!changemaker) {
      changemaker = new Changemaker();
    }
		return <ChangemakerProfileEditor changemaker={changemaker}
      onSave={this.onSave.bind(this)} onChangeVideoFile={this.onChangeVideoFile.bind(this)} />;
	}
}

export default connect(
  state => ({
    changemaker: state.cm.changemaker,
    videoUrl: state.cm.videoUrl
  })
)(ChangemakerProfileEditorContainer);
