import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

import * as shapes from '../constants/Shapes';

// import styles from '../../client/css/modules/changemaker-profile-editor.scss';

class ChangemakerProfileEditor extends Component {

  static propTypes = {
  	changemaker: shapes.changemaker.isRequired,
    onSave: PropTypes.func.isRequired
	};

  state = { mission: '' };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  onSave() {
    let changemaker = this.props.changemaker;
    const state = this.state;
    changemaker = changemaker.set('mission', { text: state.mission });
    this.props.onSave(changemaker);
  }

  render() {
    this.changemaker = this.props.changemaker;
    return (
      <Card>
        <CardText>
          <section>
            <Input type='text' multiline label='Mission' rows={10}
              value={this.state.mission} onChange={this.handleChange.bind(this, 'mission')}/>
            <Button label='Speichern' onClick={this.onSave.bind(this)} raised accent />
          </section>
        </CardText>
      </Card>
    );
  }
}

export default ChangemakerProfileEditor;
