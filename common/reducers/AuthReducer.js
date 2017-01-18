import { combineReducers } from 'redux'
import { LoginState} from '../constants/Types'
import types from '../constants/ActionTypes'
import createReducer  from '../utils/createReducer'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

function LOGIN_SUCCESS(state, action){
	debugger

	return state.set('isAuthenticated', true).set('profile', action.profile)
	.set('loggedUserId', action.userId);

}

function LOGIN_ERROR(state, action){
	debugger
	return state.set('isAuthenticated', false)

}

function LOGOUT_SUCCESS(state, action){
	state.set('profile', null)
	return state.set('isAuthenticated', false)
}

const handlers = {
	[types.LOGIN_SUCCESS]: LOGIN_SUCCESS,
	[types.LOGIN_ERROR]: LOGIN_ERROR,
	[types.LOGOUT_SUCCESS]: LOGOUT_SUCCESS,

}

export default createReducer(new LoginState(), handlers)

