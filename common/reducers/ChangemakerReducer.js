/* eslint brace-style: 0 */

import Immutable from 'immutable';
import _ from 'lodash';
import {ChangemakerState } from '../constants/Types';
import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function READ_ALL_CHANGEMAKERS_REQUEST( state ) { return state; }
function READ_ALL_CHANGEMAKERS_ERROR( state ) { return state; }
function READ_ALL_CHANGEMAKERS_SUCCESS( state, action ) {
	return state.update( 'changemakers', () => Immutable.fromJS(action.result) )
}

function SUPPORT_CHANGEMAKER( state, action ) {
	return state.update( 'changemakers', list => {

		// NOTE this is not how we will update the state in general
		// it is a showcase how to update state in general
		return list.update(
		  list.findIndex(function(item) {
		    return action.changemakerId === item.id;
		  }), function(item) {
		    return item.set('isBackedByMe', true);
		  }
		);
	})
}

function GET_FEATURED_CHANGEMAKERS_REQUEST (state){return state;}
function GET_FEATURED_CHANGEMAKERS_ERROR (state){return state;}
function GET_FEATURED_CHANGEMAKERS_SUCCESS(state, action){
	return state.update('changemakers', () => Immutable.fromJS(action.result) )
}

function mergeLists(l1, l2, keySelector) {
	let newList = l1.valueSeq();
	let newKeys = l2.map(keySelector);
	newList = newList.filter(item => !newKeys.includes(keySelector(item)));
	newList = newList.concat(l2);
	return Immutable.List(newList);
}

function GLOBAL_SEARCH_SUCCESS( state, action ) {
	let resultChangemaker = action.result.map(r => r.changemaker);
	return state.update( 'changemakers', changemakers => {
		let newList = mergeLists(changemakers, resultChangemaker, _.property('id'));
		return newList;
	});
}

const handlers =
{
	[types.READ_ALL_CHANGEMAKERS_REQUEST]: READ_ALL_CHANGEMAKERS_REQUEST,
	[types.READ_ALL_CHANGEMAKERS_SUCCESS]: READ_ALL_CHANGEMAKERS_SUCCESS,
	[types.READ_ALL_CHANGEMAKERS_ERROR]: READ_ALL_CHANGEMAKERS_ERROR,

	[types.SUPPORT_CHANGEMAKER]: SUPPORT_CHANGEMAKER,

	[types.GLOBAL_SEARCH_SUCCESS]: GLOBAL_SEARCH_SUCCESS,

	[types.GET_FEATURED_CHANGEMAKERS_REQUEST]: GET_FEATURED_CHANGEMAKERS_REQUEST,
	[types.GET_FEATURED_CHANGEMAKERS_SUCCESS]: GET_FEATURED_CHANGEMAKERS_SUCCESS,
	[types.GET_FEATURED_CHANGEMAKERS_ERROR]:GET_FEATURED_CHANGEMAKERS_ERROR
}

export default createReducer( new ChangemakerState(), handlers );
