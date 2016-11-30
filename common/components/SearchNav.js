import React from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {Navigation} from 'react-toolbox/lib/navigation';
import {Link} from 'react-toolbox/lib/link';
import {FontIcon} from 'react-toolbox/lib/font_icon';

export default props => (<AppBar>
	<Link href="/">
		<FontIcon value="arrow_back" />
	</Link>
	{props.children}
</AppBar>)
