/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import ChangemakerSupportForm from '../components/ChangemakerSupportForm'
import SupportChangemakerActions from '../actions/SupportChangemakerActions'
import { bindActionCreators } from 'redux';

import * as Shapes from '../constants/Shapes';

import styles from '../../client/css/modules/changemaker-card.scss';

class SupportChangemakerContainer extends React.Component {

	constructor(props, context){
		this.actions = bindActionCreators(SupportChangemakerActions, props.dispatch);
	}

	render() {
			return (
				<ChangemakerSupportForm
						amount = {this.props.amount}
				/>
			)
	}

}

export default SupportChangemakerContainer;

export default connect( (state) => ({
	isAuthenticated: state.login.isAuthenticated,
	userId: state.login.loggedUserId,
	amount: state.support.amount
}) )(MainNav);
