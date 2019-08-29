import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import groceryReducer from './groceryReducer';
import listReducer from './listReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  grocery: groceryReducer,
  list: listReducer
});
