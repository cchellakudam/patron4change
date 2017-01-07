import { combineReducers } from 'redux';

import cm from './ChangemakerReducer';
import search from './SearchReducer';
import app from './AppReducer';

export default combineReducers({
  cm,
  search,
  app
});
