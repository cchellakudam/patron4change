/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React from 'react';
import Button  from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Input } from 'react-toolbox/lib/input';
import { List, ListSubHeader, ListItem } from 'react-toolbox/lib/list'
import styles from '../../client/css/modules/support-changemaker-form.scss';
import ActionStatus from './ActionStatus';


class ChangemakerSupportForm extends React.Component {
	state = {
		redirect: false
	};

	constructor(props){
		super(props);
		this.handleSupport = this.handleSupport.bind(this);
	}

	handleSupport(){

		let supportData = {
			amount: this.props.amount,
			comment: this.props.comment,
			patron4ChangeFees: this.props.patron4ChangeFees,
			patronId: this.props.userId,
			changemakerId: parseInt(this.props.changemakerId)
		}
		this.props.handleSupport(supportData);
		this.setState({redirect: true});
	}

	render() {

		const TooltipButton = Tooltip(Button);
		let actionStatus = null;
		if(this.state.redirect){
			let message = 'Sie werden in kürze nach dem Payment Provider weitergeleitet';
			let status = 'info';
			actionStatus = <ActionStatus status={status} message={message}/>
		}

		return (


	<Grid className={styles.container}>
		{actionStatus}
		<h1>Unterstützen {this.props.changemakerName}</h1>
		<br/>
		<br/>

		<Row>
				<Col lg={6}>
					<Row>
						<Input type='text' icon='card_giftcard' label='Unterstützung' name='amount'
									value={`${this.props.amount}€`}	/>

					</Row>
					<Row>
						<Input type='text' icon='payment' label='Bruttobetrag'
									name='grossAmount' value={`${this.props.grossAmount}€`}
						/>
					</Row>
				</Col>

				<Col lg={6}>
					<Row middle="lg">
						<TooltipButton  label='+5€' raised  ripple tooltip='hinzufügen'
								onClick={() => {
																	this.props.handleAddAmount(5)
																}}/>
						<TooltipButton  label='+10€' raised  ripple tooltip='hinzufügen'
								onClick={() => {
																	this.props.handleAddAmount(10)
																}}/>
						<TooltipButton  label='+25€' raised  ripple tooltip='hinzufügen'
								onClick={() => {
																	this.props.handleAddAmount(25)
																}}/>
						<TooltipButton  label='+50€' raised  ripple tooltip='hinzufügen'
								onClick={() => {
																	this.props.handleAddAmount(50)
																}}/>
					</Row>

					<Row middle="lg">
						<TooltipButton  label='-5€' raised  ripple tooltip='abziehen'
										onClick={() => {
																		this.props.handleSubtractAmount(5)
																		}} inverse/>
						<TooltipButton  label='-10€' raised  ripple tooltip='abziehen'
										onClick={() => {
																		this.props.handleSubtractAmount(10)
																		}} inverse/>
						<TooltipButton  label='-25€' raised  ripple tooltip='abziehen'
										onClick={() => {
																		this.props.handleSubtractAmount(25)
																		}} inverse/>
						<TooltipButton  label='-50€' raised  ripple tooltip='abziehen'
										onClick={() => {
																		this.props.handleSubtractAmount(50)
																		}} inverse/>
					</Row>
				</Col>
		</Row>

		<Row>
			<Col lg={6}>
				<List selectable ripple>
					<ListSubHeader caption='Aufteilung des Betrag' />
					<ListItem
						avatar='/public/images/logo.png'
						caption={`${this.props.amount}€`}
						legend={`${this.props.amount}% für ${this.props.changemakerName}` }
						rightIcon='star'
					/>

					<ListItem
						avatar='/public/images/logo.png'
						caption={`${this.props.patron4ChangeFees}€`}
						legend={`${this.props.patron4ChangeRate}% von Patron4Change` }
					/>
					<ListItem
						avatar='/public/images/paymentProvider.png'
						caption={`${this.props.providerFees}€`}
						legend={`${this.props.providerAdjustableRate}% +
															${this.props.providerFixedRate}€ von Payment Provider`}
					/>

				</List>
			</Col>
			<Col lg={6}>
				{this.props.children}
			</Col>


		</Row>

		<Row>
			<Input type='text' multiline icon='message' label={`Kommentar für ${this.props.changemakerName}`} rows={5} maxLength={500}/>
		</Row>

		<Row>
			<Button label="unterstützen" icon="star_border" primary onClick={this.handleSupport.bind(this)} raised/>
		</Row>

	</Grid>
	)
	}

}

export default ChangemakerSupportForm;