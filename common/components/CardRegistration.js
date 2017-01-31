import React, { Component } from 'react'
import countries from '../../public/countries'
import Dropdown from 'react-toolbox/lib/dropdown';
import { Grid, Row } from 'react-flexbox-grid';
import { Card, CardText } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

export default class CardRegistration extends React.Component {
	state = {
		cardNumber: '',
		cardExpirationDate: '',
		cardCvx: ''
	}

	handleChange = (name, value) => {
		debugger
		this.setState({...this.state, [name]: value});
	};

	onClickUpdate(){
		let cardData = {
			cardNumber: this.state.cardNumber,
			cardExpirationDate: this.state.cardExpirationDate,
			cardCvx: this.state.cardCvx,
		}
		console.log(cardData)
	}

	onClickSubmit(){
		console.log('submit')
	}

	render() {
		return (
			<div>
				<Grid>
					<br/>
					<h1>Kreditkarte Registrierung</h1>

					<Input type='text' label='Kreditkartennummer' name='cardNumber' value={this.state.cardNumber}
									onChange={this.handleChange.bind(this, 'cardNumber')} maxLength={16}
								 error={isNaN(parseInt(this.state.cardNumber)) ? 'Feld muss ein Nummer sein' : ''}/>
					<Input type='date' label='Kartenablaufdatum' name='cardExpirationDate' value={this.state.cardExpirationDate}
								 onChange={this.handleChange.bind(this, 'cardExpirationDate')}/>
					<Input type='text' label='CVV' name='cardCvx' value={this.state.cardCvx}
									onChange={this.handleChange.bind(this, 'cardCvx')} maxLength={3}
								 error={isNaN(parseInt(this.state.cardCvx)) ? 'Feld muss ein Nummer sein' : ''}/>


					<Button icon='save' label='Registrieren' onClick={this.onClickSubmit.bind(this)} raised/>
				</Grid>
			</div>
		)

	}
}

