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
		changemaker: PropTypes.object
	}

  state = { saved: false };

  constructor(props) {
    super();
		this.actions = bindActionCreators(ChangemakerActions, props.dispatch);
  }

  onSave(changemaker) {
    this.setState({ saved: true });
    this.actions.saveChangemaker(changemaker);
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
		return <ChangemakerProfileEditor changemaker={changemaker} onSave={this.onSave.bind(this)} />;
	}
}

export default connect(
  state => ({ changemaker: state.cm.changemaker })
)(ChangemakerProfileEditorContainer);
