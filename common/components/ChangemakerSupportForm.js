/* eslint no-undefined: 0 */
// no-undefined: needed for conditional avatarUrl
import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-toolbox/lib/button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Input } from 'react-toolbox/lib/input';

import * as Shapes from '../constants/Shapes';

import styles from '../../client/css/modules/changemaker-card.scss';

class ChangemakerSupportForm extends React.Component {

	render() {
		return (
	<Grid>
		<Row>
			<Button label='add' label='5' raised  ripple />
			<Button label='add' label='10' raised  ripple />
			<Button label='add' label='25' raised  ripple />
			<Button label='add' label='50' raised  ripple />
		</Row>

		<Row>
			<Input type='number' label='Amount' name='amount' value={0}
					/>
		</Row>

		<Row>
			<Input type='text' multiline label='Kommentar' rows={5} maxLength={500} />
		</Row>

		<Row>
			<Button label="unterstützen" icon="star_border" primary raised/>
		</Row>

	</Grid>
	)
	}

}

export default ChangemakerSupportForm;
