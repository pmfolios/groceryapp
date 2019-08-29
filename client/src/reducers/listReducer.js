import {
  ADD_LIST,
  GET_LISTS,
  GET_LISTNAME,
  GROCERY_LOADING
} from '../actions/types';

const initialState = {
  lists: [],
  currentList: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GROCERY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false
      };
    case GET_LISTNAME:
      return {
        ...state,
        currentList: action.payload
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [action.payload, ...state.lists]
      };
    default:
      return state;
  }
}
