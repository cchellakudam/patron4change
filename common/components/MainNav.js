import React, { Component, PropTypes } from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {Navigation} from 'react-toolbox/lib/navigation';
import {Link} from 'react-toolbox/lib/link';

export default class MainNav extends React.Component {
  render() {
    return <AppBar title='patron4change'>
			<Navigation type='horizontal'>
				<span>Changemaker</span>
				<Link href="/search">Search</Link>
			</Navigation>
		</AppBar>;
  }
}
