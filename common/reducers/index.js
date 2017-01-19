import { combineReducers } from 'redux';

import cm from './ChangemakerReducer';
import search from './SearchReducer';
import login from './AuthReducer'

export default combineReducers({
  cm,
  search,
	login
});
