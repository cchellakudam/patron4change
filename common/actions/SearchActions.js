import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'

export function search(term) {
	return {
		types: [
			types.GLOBAL_SEARCH_REQUEST,
			types.GLOBAL_SEARCH_SUCCESS,
			types.GLOBAL_SEARCH_ERROR
		],
		term,
		promise: WebAPIUtils.search(term)
	};
}
