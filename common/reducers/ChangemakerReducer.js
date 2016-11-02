/* eslint brace-style: 0 */

import Immutable from 'immutable';
import {ChangemakerState } from '../constants/Types';
import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function READ_ALL_CHANGEMAKERS_REQUEST( state ) { return state; }
function READ_ALL_CHANGEMAKERS_ERROR( state ) { return state; }
function READ_ALL_CHANGEMAKERS_SUCCESS( state, action ) {
	return state.update( 'changemakers', () => Immutable.fromJS(action.result) )
}

function SUPPORT_CHANGEMAKER( state, action ) {
	return state.update( 'changemakers', list => {

		// NOTE this is not how we will update the state in general
		// it is a showcase how to update state in general
		return list.update(
		  list.findIndex(function(item) {
		    return action.changemakerId === item.id;
		  }), function(item) {
		    return item.set('isBackedByMe', true);
		  }
		);
	})
}

const handlers =
{
	[types.READ_ALL_CHANGEMAKERS_REQUEST]: READ_ALL_CHANGEMAKERS_REQUEST,
	[types.READ_ALL_CHANGEMAKERS_SUCCESS]: READ_ALL_CHANGEMAKERS_SUCCESS,
	[types.READ_ALL_CHANGEMAKERS_ERROR]: READ_ALL_CHANGEMAKERS_ERROR,
	[types.SUPPORT_CHANGEMAKER]: SUPPORT_CHANGEMAKER
}

export default createReducer( new ChangemakerState(), handlers );
