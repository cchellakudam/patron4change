/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React from 'react';
import Button  from 'react-toolbox/lib/button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card'
import { browserHistory } from 'react-router';

class ChangemakerPaymentConfirmation extends React.Component {
	state = {
		redirect: false
	};

	handleClickHome(){
		browserHistory.push('/');
	}

	render() {

		return (
			<Grid>
				<Row>
				<Card style={{width: '350px'}}>
					<CardTitle
						title="Vielen Dank"
						subtitle='Ihre Zahlung war erfolgreich'
					/>
					<CardText>
						{`Ihre Zahlung war erfolgreich, ${this.props.changemakerName} werde bald Ihre Unterstützung erhalten`}
					</CardText>
					<CardActions>
						<Button label="Zurück" onClick={this.handleClickHome}/>
					</CardActions>
				</Card>
				</Row>

			</Grid>
		)
	}

}

export default ChangemakerPaymentConfirmation;
