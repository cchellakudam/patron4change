import React from 'react'
import { Route } from 'react-router'
import App from '../components/App';
import ChangemakerGalleryContainer from '../containers/ChangemakerGalleryContainer';
import SearchContainer from '../containers/SearchContainer';
import NotFound from '../components/NotFound';

const Empty = () => <div></div>;
const TBD = () => <img src="https://www7.iclub.be/images/upload/226/underconstruction.jpg" />;

const Nav = () => <SearchContainer />;

export default (

  <Route component={App}>

	<Route path="/"
		   components={{main: ChangemakerGalleryContainer, nav: Nav, sub: Empty}} />

	<Route path="/:id"
		   components={{main: TBD, nav: Nav, sub: Empty}} />

	<Route path="*"
		   components={{main: NotFound, nav: Nav, sub: Empty}} />
  </Route>

)
