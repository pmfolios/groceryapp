import axios from 'axios';

import {
  ADD_SINGLEITEM,
  GET_ERRORS,
  GET_GROCERIES,
  GROCERY_LOADING,
  GROCERY_RESET,
  DELETE_SINGLEITEM,
  BOUGHT_SINGLEITEM
} from './types';

//Get groceries for "What am I out of " list (all items that = (datenow - last bought time) > avg time btwn buys)
export const outOfNow = user => dispatch => {
  dispatch(setGroceryLoading());

  axios
    .get('/api/groceries', user)
    .then(res =>
      dispatch({
        type: GET_GROCERIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROCERIES,
        payload: null
      })
    );
};

//Get all items in the a specific grocery list
export const getGroceries = id => dispatch => {
  dispatch(setGroceryLoading());

  axios
    .get(`/api/groceries/${id}`)
    .then(res =>
      dispatch({
        type: GET_GROCERIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROCERIES,
        payload: null
      })
    );
};

//Update all items in list to bought: false upon componentWillUnmount for a grocery list
export const resetGroceries = id => dispatch => {
  axios
    .post(`/api/groceries/reset/${id}`)
    .then(res =>
      dispatch({
        type: GROCERY_RESET
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add item to grocery list
export const addSingleItem = itemData => dispatch => {
  axios
    .post('/api/groceries', itemData)
    .then(res =>
      dispatch({
        type: ADD_SINGLEITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete item from grocery list
export const deleteSingleItem = id => dispatch => {
  axios
    .delete(`/api/groceries/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SINGLEITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Bought toggle i.e. clicked checkbox for item from grocery list
export const boughtSingleItem = id => dispatch => {
  axios
    .post(`/api/groceries/${id}`)
    .then(res =>
      dispatch({
        type: BOUGHT_SINGLEITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set loading state
export const setGroceryLoading = () => {
  return {
    type: GROCERY_LOADING
  };
};
