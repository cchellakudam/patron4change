import React from 'react'
import { Route } from 'react-router'

import LoginContainer from '../containers/LoginContainer';
import LandingPageContainer from '../containers/LandingPageContainer';
import SearchContainer from '../containers/SearchContainer';
import SearchResultContainer from '../containers/SearchResultContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import MainNav from '../containers/MainNav';

import SearchNav from '../components/SearchNav';
import App from '../components/App';

import NotFound from '../components/NotFound';

const Empty = () => <div></div>;

const SearchNavContainer = () => <SearchNav><SearchContainer /></SearchNav>;

export default (

  <Route component={App}>

	<Route path="/"
		   components={{main: LandingPageContainer, nav: MainNav, sub: Empty}} />

  // for regular users - a list of all supported changemakers
  // for admins - a list of all changemakers, whereas the unvetted changemakers are shown first
	<Route path="/changemaker"
		   components={{main: Empty, nav: MainNav, sub: Empty}} />

  // changemaker detail page
	<Route path="/changemaker/:id"
		   components={{main: Empty, nav: MainNav, sub: Empty}} />

  // changemaker support payment page
	<Route path="/changemaker/:id/support"
		   components={{main: Empty, nav: MainNav, sub: Empty}} />

	<Route path="/search"
		   components={{main: SearchResultContainer, nav: SearchNavContainer, sub: Empty}} />

 	<Route path="/login"
 			 components={{main: LoginContainer, nav: MainNav, sub: Empty}} />

  // profile of any user
	<Route path="/users/:id"
			 components={{main: UserProfileContainer, nav: MainNav, sub: Empty}} />

	<Route path="*"
		   components={{main: NotFound, nav: MainNav, sub: Empty}} />
  </Route>

)
