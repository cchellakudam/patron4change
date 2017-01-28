import { combineReducers } from 'redux';

import cm from './ChangemakerReducer';
import search from './SearchReducer';
import login from './AuthReducer';
import support from './SupportChangemakerReducer'
import user from './UserReducer';

export default combineReducers({
  cm,
  search,
	login,
	support,
	user
});
