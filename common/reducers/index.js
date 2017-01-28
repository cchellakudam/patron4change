import { combineReducers } from 'redux';

import cm from './ChangemakerReducer';
import search from './SearchReducer';
import login from './AuthReducer';
import user from './UserReducer';

export default combineReducers({
  cm,
  search,
	login,
	user
});
