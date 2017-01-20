/**
 * Created by ling on 19.01.17.
 */
import types from '../constants/ActionTypes'
import createReducer  from '../utils/createReducer'

function ADD_SUPPORT_AMOUNT(state, action){
	return {
		...state,
		amount: state.amount + action.value,
	}
}

