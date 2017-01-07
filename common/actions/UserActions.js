import types from '../constants/ActionTypes'
// import WebAPIUtils from '../utils/WebAPIUtils'

export function login() {
	const userId = 1; // get from server in the future
	localStorage.userId = userId;
	return {
		type: types.LOGIN_SUCCESS,
		userId
	};
}
