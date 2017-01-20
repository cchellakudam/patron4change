/**
 * Created by ling on 19.01.17.
 */
import types from '../constants/ActionTypes'
import createReducer  from '../utils/createReducer'
import {paymentFees} from '../utils/paymentFees'

function calculateFees(value){
	let patron4ChangeFees = +(value * paymentFees.patron4Change).toFixed(2)
	let providerFees =  +(value * paymentFees.providerAdjustable + paymentFees.providerFixed).toFixed(2);
	let grossAmount = +(value + patron4ChangeFees + providerFees).toFixed(2);

	return {
		grossAmount: grossAmount,
		patron4ChangeFees: patron4ChangeFees,
		providerFees: providerFees
	}
}

function ADD_SUPPORT_AMOUNT(state, action){
	let amount = state.amount + action.value;
	let fees = calculateFees(amount);
	return {
		...state,
		amount: amount,
		grossAmount: fees.grossAmount,
		patron4ChangeFees: fees.patron4ChangeFees,
		providerFees: fees.providerFees,
		providerAdjustableRate: paymentFees.providerAdjustable,
		providerFixedRate: paymentFees.providerFixed
	}
}

function SUBTRACT_SUPPORT_AMOUNT(state, action){

	let amount = state.amount - action.value;
	if(0 > amount ){
		amount = 0;
	}
	let fees = calculateFees(amount);
	return {
		...state,
		amount: amount,
		grossAmount: fees.grossAmount,
		patron4ChangeFees: fees.patron4ChangeFees,
		providerFees: fees.providerFees,
		providerAdjustableRate: paymentFees.providerAdjustable,
		providerFixedRate: paymentFees.providerFixed
	}
}

const initialSupportState = {
	amount: 0,
	grossAmount: 0,
	patron4ChangeFees:0,
	providerFees:0,
	isPeriodic: false,
	paymentUrl: null

};

function SUPPORT_CHANGEMAKER_REQUEST( state ) {
	return state;
}
function SUPPORT_CHANGEMAKER_ERROR( state ) {
	return state;
}
function SUPPORT_CHANGEMAKER_SUCCESS( state, action ) {
	return {
		...state,
		paymentUrl: action.result.data
	};
}

const handlers = {
	[types.ADD_SUPPORT_AMOUNT]: ADD_SUPPORT_AMOUNT,
	[types.SUBTRACT_SUPPORT_AMOUNT]: SUBTRACT_SUPPORT_AMOUNT,
	[types.SUPPORT_CHANGEMAKER_REQUEST]: SUPPORT_CHANGEMAKER_REQUEST,
	[types.SUPPORT_CHANGEMAKER_ERROR]: SUPPORT_CHANGEMAKER_ERROR,
	[types.SUPPORT_CHANGEMAKER_SUCCESS]: SUPPORT_CHANGEMAKER_SUCCESS
}

export default createReducer( initialSupportState, handlers );

