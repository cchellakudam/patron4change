import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function LOGIN_SUCCESS( state, action ) {
	return { ...state, userId: action.userId };
}

const handlers =
{
	[types.LOGIN_SUCCESS]: LOGIN_SUCCESS
}

const initialState = {
	userId: null
};
export default createReducer( initialState, handlers );
