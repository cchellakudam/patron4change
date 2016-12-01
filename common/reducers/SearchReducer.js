import _ from 'lodash';
import {SearchState } from '../constants/Types';
import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function GLOBAL_SEARCH_REQUEST( state, action ) {
	return state.set('term', action.term);
}

function GLOBAL_SEARCH_SUCCESS( state, action ) {
  return state.set('results', action.result.map(r => {
		return Object.assign({}, r.match, { changemakerId: r.changemaker.id });
	}));
}

const GLOBAL_SEARCH_ERROR = _.identity;

const handlers =
{
	[types.GLOBAL_SEARCH_REQUEST]: GLOBAL_SEARCH_REQUEST,
	[types.GLOBAL_SEARCH_SUCCESS]: GLOBAL_SEARCH_SUCCESS,
	[types.GLOBAL_SEARCH_ERROR]: GLOBAL_SEARCH_ERROR,
}

export default createReducer( new SearchState(), handlers );
