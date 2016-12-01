import { combineReducers } from 'redux';

import cm from './ChangemakerReducer';
import search from './SearchReducer';

export default combineReducers({
  cm,
  search
});
