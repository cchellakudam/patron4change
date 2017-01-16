import { combineReducers } from 'redux';

import cm from './ChangemakerReducer';
import search from './SearchReducer';
import app from './AppReducer';
import login from './LoginReducer'

export default combineReducers({
  cm,
  search,
  app,
	login,
});
