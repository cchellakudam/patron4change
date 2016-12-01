import React from 'react'
import { Route } from 'react-router'

import ChangemakerGalleryContainer from '../containers/ChangemakerGalleryContainer';

import SearchContainer from '../containers/SearchContainer';
import SearchResultContainer from '../containers/SearchResultContainer';
import UserProfileContainer from '../containers/UserProfileContainer';

import MainNav from '../components/MainNav';
import SearchNav from '../components/SearchNav';
import App from '../components/App';

import NotFound from '../components/NotFound';

const Empty = () => <div></div>;

const SearchNavContainer = () => <SearchNav><SearchContainer /></SearchNav>;

export default (

  <Route component={App}>

	<Route path="/"
		   components={{main: ChangemakerGalleryContainer, nav: MainNav, sub: Empty}} />

	<Route path="/changemakers/:id"
		   components={{main: Empty, nav: MainNav, sub: Empty}} />

	<Route path="/search"
		   components={{main: SearchResultContainer, nav: SearchNavContainer, sub: Empty}} />

	<Route path="/users/:id"
			 components={{main: UserProfileContainer, nav: MainNav, sub: Empty}} />

	<Route path="*"
		   components={{main: NotFound, nav: MainNav, sub: Empty}} />
  </Route>

)
