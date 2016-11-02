import React from 'react'
import { Route } from 'react-router'
import App from '../components/App';
import ChangemakerGalleryContainer from '../containers/ChangemakerGalleryContainer';
import NotFound from '../components/NotFound';

const Empty = () => <div></div>;
const TBD = () => <img src="https://www7.iclub.be/images/upload/226/underconstruction.jpg" />;

export default (

  <Route component={App}>

	<Route path="/"
		   components={{main: ChangemakerGalleryContainer, sub: Empty}} />

	<Route path="/:id"
		   components={{main: TBD, sub: Empty}} />

	<Route path="*"
		   components={{main: NotFound, sub: Empty}} />
  </Route>

)
