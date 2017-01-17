/* eslint brace-style: 0 */

import Immutable from 'immutable';
import _ from 'lodash';
import {ChangemakerState } from '../constants/Types';
import createReducer from '../utils/createReducer';
import types from '../constants/ActionTypes';

function mergeLists(l1, l2, keySelector) {
	let newList = l1.valueSeq();
	let newKeys = l2.map(keySelector);
	newList = newList.filter(item => !newKeys.includes(keySelector(item)));
	newList = newList.concat(l2);
	return Immutable.List(newList);
}

function mergeInChangemaker(state, newChangemakers) {
	return state.update( 'changemakers', changemakers => {
		return mergeLists(changemakers, newChangemakers, _.property('id'));
	});
}

function READ_ALL_CHANGEMAKERS_REQUEST( state ) { return state; }
function READ_ALL_CHANGEMAKERS_ERROR( state ) { return state; }
function READ_ALL_CHANGEMAKERS_SUCCESS( state, action ) {
	return state.update( 'changemakers', () => Immutable.fromJS(action.result) )
}

function SUPPORT_CHANGEMAKER( state ) {
	return state.update( 'changemakers', list => {
		// TODO implement with REST transaction
		return list;
	})
}

function GET_FEATURED_CHANGEMAKERS_REQUEST (state){return state;}
function GET_FEATURED_CHANGEMAKERS_ERROR (state){return state;}
function GET_FEATURED_CHANGEMAKERS_SUCCESS(state, action){
	let featuredIds = Immutable.fromJS(action.result.map(cm => cm.id));
	return mergeInChangemaker(state, action.result)
		.set('featuredChangemakers', featuredIds);
}

function GLOBAL_SEARCH_SUCCESS( state, action ) {
	let resultChangemaker = action.result.map(r => r.changemaker);
	return mergeInChangemaker(state, resultChangemaker);
}

function GET_CHANGEMAKER_BY_ID_REQUEST(state) { return state; }
function GET_CHANGEMAKER_BY_ID_ERROR(state) { return state; }
function GET_CHANGEMAKER_BY_ID_SUCCESS(state, action) {
	// TODO merge to entire list
	return state.update('changemaker', () => Immutable.fromJS(action.result));
}

function SAVE_CHANGEMAKER_PROFILE_REQUEST(state) {return state; }
function SAVE_CHANGEMAKER_PROFILE_ERROR(state) {return state; }
function SAVE_CHANGEMAKER_PROFILE_SUCCESS(state, action) {
	return state.update('changemaker', () => Immutable.fromJS(action.result));
}

function UPLOAD_VIDEO_SUCCESS(state, action) {
	return state.update('videoUrl', () => action.result);
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
	[types.GET_FEATURED_CHANGEMAKERS_ERROR]:GET_FEATURED_CHANGEMAKERS_ERROR,

	[types.GET_CHANGEMAKER_BY_ID_REQUEST]: GET_CHANGEMAKER_BY_ID_REQUEST,
	[types.GET_CHANGEMAKER_BY_ID_SUCCESS]: GET_CHANGEMAKER_BY_ID_SUCCESS,
	[types.GET_CHANGEMAKER_BY_ID_ERROR]: GET_CHANGEMAKER_BY_ID_ERROR,

	[types.SAVE_CHANGEMAKER_PROFILE_REQUEST]: SAVE_CHANGEMAKER_PROFILE_REQUEST,
	[types.SAVE_CHANGEMAKER_PROFILE_SUCCESS]: SAVE_CHANGEMAKER_PROFILE_SUCCESS,
	[types.SAVE_CHANGEMAKER_PROFILE_ERROR]: SAVE_CHANGEMAKER_PROFILE_ERROR,

	[types.UPLOAD_VIDEO_REQUEST]: _.identity,
	[types.UPLOAD_VIDEO_SUCCESS]: UPLOAD_VIDEO_SUCCESS,
	[types.UPLOAD_VIDEO_ERROR]: _.identity
}

export default createReducer( new ChangemakerState(), handlers );
