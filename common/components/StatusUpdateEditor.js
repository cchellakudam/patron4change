import React, { PropTypes } from 'react';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';


class StatusUpdateEditor extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onInput: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  };


	render() {
    // const update = this.props.update;
		return <div>
      <Input type='text' multiline hint='Was gibt es neues?' rows={10} maxLength={200}
        value={this.props.text} onChange={this.props.onInput}/>
      <Button raised onClick={this.props.onConfirm}>Hinzufügen</Button>
    </div>;
	}
}

export default StatusUpdateEditor;
