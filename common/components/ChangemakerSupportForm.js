/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Input } from 'react-toolbox/lib/input';
import { List, ListSubHeader, ListItem } from 'react-toolbox/lib/list'
import styles from '../../client/css/modules/support-changemaker-form.scss';


class ChangemakerSupportForm extends React.Component {

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
	}

	render() {

		return (
	<Grid className={styles.container}>

		<Row>
				<Col lg={6}>
					<Row>
						<Input type='text' icon='card_giftcard' label='Unterstützung' name='amount'
									value={`${this.props.amount}€`}	disabled/>

					</Row>
					<Row>
						<Input type='text' icon='payment' label='Bruttobetrag'
									name='grossAmount' value={`${this.props.grossAmount}€`}
						disabled/>
					</Row>
				</Col>

				<Col lg={6}>
					<Row middle="lg">
						<Button  label='+5' raised  ripple
								onClick={() => {
																	this.props.handleAddAmount(5)
																}}/>
						<Button  label='+10' raised  ripple
								onClick={() => {
																	this.props.handleAddAmount(10)
																}}/>
						<Button  label='+25' raised  ripple
								onClick={() => {
																	this.props.handleAddAmount(25)
																}}/>
						<Button  label='+50' raised  ripple
								onClick={() => {
																	this.props.handleAddAmount(50)
																}}/>
					</Row>

					<Row middle="lg">
						<Button  label='-5' raised  ripple
										onClick={() => {
																		this.props.handleSubtractAmount(5)
																		}} inverse/>
						<Button  label='-10' raised  ripple
										onClick={() => {
																		this.props.handleSubtractAmount(10)
																		}} inverse/>
						<Button  label='-25' raised  ripple
										onClick={() => {
																		this.props.handleSubtractAmount(25)
																		}} inverse/>
						<Button  label='-50' raised  ripple
										onClick={() => {
																		this.props.handleSubtractAmount(50)
																		}} inverse/>
					</Row>
				</Col>
		</Row>

		<Row>
					<List selectable ripple>
						<ListSubHeader caption='Aufteilung des Betrag' />
							<ListItem
						avatar='/public/images/logo.png'
						caption={`${this.props.amount}€`}
						legend={`${this.props.amount}% für Changemaker` }
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
		</Row>

		<Row>
			<Input type='text' multiline icon='message' label='Kommentar' rows={5} maxLength={500} />
		</Row>

		<Row>
			<Button label="unterstützen" icon="star_border" primary onClick={this.handleSupport} raised/>
		</Row>

	</Grid>
	)
	}

}

export default ChangemakerSupportForm;
