/* eslint brace-style: 0 */

import { AppState } from '../constants/Types';
import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function LOGIN_SUCCESS( state, action ) {
	return state.set('userId', action.userId);
}

const handlers =
{
	[types.LOGIN_SUCCESS]: LOGIN_SUCCESS
}

export default createReducer( new AppState(), handlers );
