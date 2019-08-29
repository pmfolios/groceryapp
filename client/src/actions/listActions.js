import axios from 'axios';

import {
  ADD_LIST,
  GET_ERRORS,
  GET_LISTS,
  GROCERY_LOADING,
  GET_LISTNAME
} from './types';

//Get all lists for logged in user
export const getLists = () => dispatch => {
  dispatch(setGroceryLoading());

  axios
    .get('api/lists')
    .then(res =>
      dispatch({
        type: GET_LISTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LISTS,
        payload: null
      })
    );
};

//Get name of specific grocery list
export const getListName = id => dispatch => {
  axios
    .get(`/api/lists/${id}`)
    .then(res =>
      dispatch({
        type: GET_LISTNAME,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LISTNAME,
        payload: null
      })
    );
};

//Set loading state
export const setGroceryLoading = () => {
  return {
    type: GROCERY_LOADING
  };
};

//Add list
export const addList = listData => dispatch => {
  axios
    .post('/api/lists', listData)
    .then(res =>
      dispatch({
        type: ADD_LIST,
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
