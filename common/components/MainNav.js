import React from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {Navigation} from 'react-toolbox/lib/navigation';
import {Link} from 'react-toolbox/lib/link';
import { browserHistory } from 'react-router';

export default class MainNav extends React.Component {

  onNavigateToSearch(e) {
    e.preventDefault();
    browserHistory.push('/search');
  }

  render() {
    return <AppBar title='patron4change'>
			<Navigation type='horizontal'>
				<span>Changemaker</span>
				<Link href="/search" onClick={this.onNavigateToSearch}>Search</Link>
			</Navigation>
		</AppBar>;
  }
}
