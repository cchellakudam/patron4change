import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/utils/configureStore';
import routes from '../common/routes/routing';

let state = null;
if (window.$REDUX_STATE) {

	state = window.$REDUX_STATE;

	state.cm = {
		$fetched: '/' === document.location.pathname,
		changemaker: {},
		changemakers: [],
		featuredChangemakers: [],
		backings: []
	};

	state.search = {
		$fetched: '/' === document.location.pathname,
		results: []
	};

	state.login = {
		$fetched: '/' === document.location.pathname,
		isAuthenticated: localStorage.id_token ? true:false,
		profile: localStorage.profile ? JSON.parse(localStorage.profile) : null,
		loggedUserId: localStorage.loggedUserId ? parseInt(localStorage.loggedUserId) : null
	}
}

const store = configureStore( state )

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.querySelector('.container')
);
