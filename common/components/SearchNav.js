/* eslint react/display-name: 0, react/prop-types: 0 */
import React from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {Link} from 'react-toolbox/lib/link';
import {FontIcon} from 'react-toolbox/lib/font_icon';
const {Col} = require('react-flexbox-grid');

export default props => <AppBar>
	<Link href="/">
		<FontIcon value="arrow_back" />
	</Link>
	{props.children}
</AppBar>;
