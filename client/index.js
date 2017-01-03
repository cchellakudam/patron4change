import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/utils/configureStore';
import { ChangemakerState, SearchState, AppState, ChangemakerRecord, convertToRecordList } from '../common/constants/Types';
import routes from '../common/routes/routing';

let state = null;
if (window.$REDUX_STATE) {

	state = window.$REDUX_STATE;

	state.cm = new ChangemakerState({
		$fetched: '/' === document.location.pathname,
		changemakers: convertToRecordList(state.cm.changemakers, ChangemakerRecord)
	});

	state.search = new SearchState({
		$fetched: '/' === document.location.pathname,
		results: convertToRecordList(state.search.results, ChangemakerRecord)
	});

	state.app = new AppState({
		$$fetched: '/' === document.location.pathname,
		userId: state.app.userId || localStorage.userId
	})
}

const store = configureStore( state )

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.querySelector('.container')
);
