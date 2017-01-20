/**
 * Created by ling on 19.01.17.
 */

import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'

export function addToAmount(value){

	return {
		type: types.ADD_SUPPORT_AMOUNT,
		value: value
	}
}

export function subtractFromAmount(value){

	return {
		type: types.SUBTRACT_SUPPORT_AMOUNT,
		value: value
	}
}

export function support(supportData){

	let promise = WebAPIUtils.oneTimeSupportForChangemaker(supportData, localStorage.id_token);
	return {
		types: [
			types.SUPPORT_CHANGEMAKER_REQUEST,
			types.SUPPORT_CHANGEMAKER_SUCCESS,
			types.SUPPORT_CHANGEMAKER_ERROR
		],
		promise
	};
}
