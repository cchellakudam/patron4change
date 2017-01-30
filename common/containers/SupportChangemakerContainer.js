/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React from 'react';
import ChangemakerSupportForm from '../components/ChangemakerSupportForm'
import * as SupportChangemakerActions from '../actions/SupportChangemakerActions'
import { bindActionCreators } from 'redux';
import * as ChangemakerActions from '../actions/ChangemakerActions';
import { fetchNeeds } from '../utils/fetchComponentData';
import ChangemakerCard from '../components/ChangemakerCard';

import { connect } from 'react-redux';

class SupportChangemakerContainer extends React.Component {

	static needs = [
		ChangemakerActions.getChangemakerById,
	];

	constructor(props){
		super(props)
		this.actions = bindActionCreators(SupportChangemakerActions, props.dispatch);
	}

	componentDidMount() {
		debugger
		fetchNeeds( SupportChangemakerContainer.needs, this.props )
	}

	componentWillReceiveProps(nextProps){

		if(null !== nextProps.paymentUrl ){
			window.location.assign(nextProps.paymentUrl);
		}
	}

	render() {debugger
			let changemakerCard = null;
			let changemakerName = null;
			if(this.props.changemaker.id){
				changemakerCard = <ChangemakerCard changemaker={this.props.changemaker}
																					 showSupport={false} showAvatar={false} onSupport={() => {}}/>
				changemakerName = this.props.changemaker.user.name
			}

			return (
			<section>
				<ChangemakerSupportForm
						amount = {this.props.amount}
						handleAddAmount = {this.actions.addToAmount}
						handleSubtractAmount = {this.actions.subtractFromAmount}
						handleSupport = {this.actions.support}
						grossAmount = {this.props.grossAmount}
						patron4ChangeFees = {this.props.patron4ChangeFees}
						patron4ChangeRate = {this.props.patron4ChangeRate*100}
						providerAdjustableRate = {this.props.providerAdjustableRate}
						providerFixedRate = {this.props.providerFixedRate}
						providerFees = {this.props.providerFees}
						userId = {this.props.userId}
						changemakerId = {this.props.params.changemakerId}
						changemakerName = {changemakerName}
				>
					{changemakerCard}
				</ChangemakerSupportForm>

			</section>
			)
	}

}

export default connect( (state) => ({
	isAuthenticated: state.login.isAuthenticated,
	userId: state.login.loggedUserId,
	amount: state.support.amount,
	grossAmount: state.support.grossAmount,
	patron4ChangeFees:state.support.patron4ChangeFees,
	patron4ChangeRate: state.support.patron4ChangeRate,
	providerFees:state.support.providerFees,
	isPeriodic: state.support.isPeriodic,
	providerAdjustableRate: state.support.providerAdjustableRate,
	providerFixedRate: state.support.providerFixedRate,
	paymentUrl: state.support.paymentUrl,
	changemaker: state.cm.changemaker

}) )(SupportChangemakerContainer);