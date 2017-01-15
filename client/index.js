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
		backings: [
			{
				id: 1,
				supporter: {
					firstName: 'Marcel',
					lastName: 'Zeilinger',
					avatarUrl: 'https://randomuser.me/api/portraits/med/men/10.jpg'
				},
				amount: 50,
				type: 'recurring',
				comment: 'Großer Fan deiner Arbeit!'
			},  {
			 id: 2,
			 supporter: {
				 firstName: 'Klara',
				 lastName: 'goldfaden',
				 avatarUrl: 'https://randomuser.me/api/portraits/med/women/21.jpg'
			 },
			 amount: 500,
			 type: 'one-time',
			 comment: 'Mach weiter so!'
		 }
		]
	};

	state.search = {
		$fetched: '/' === document.location.pathname,
		results: []
	};

	state.app = {
		$$fetched: '/' === document.location.pathname,
		userId: state.app.userId || localStorage.userId
	};
}

const store = configureStore( state )

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.querySelector('.container')
);
