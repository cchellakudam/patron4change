import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'

export function readAll() {
	let promise = WebAPIUtils.getAllChangemakers();
	return {
		types: [
			types.READ_ALL_CHANGEMAKERS_REQUEST,
			types.READ_ALL_CHANGEMAKERS_SUCCESS,
			types.READ_ALL_CHANGEMAKERS_ERROR
		],
		promise
	};
}

export function supportChangemaker(changemakerId) {
	return {
		type: types.SUPPORT_CHANGEMAKER,
		changemakerId
	};
}
