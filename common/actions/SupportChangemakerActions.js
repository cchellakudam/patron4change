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
