import {
  ADD_SINGLEITEM,
  GET_GROCERIES,
  GROCERY_LOADING,
  GROCERY_RESET,
  DELETE_SINGLEITEM,
  BOUGHT_SINGLEITEM
} from '../actions/types';

const initialState = {
  groceries: [],
  singleItem: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GROCERY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GROCERY_RESET:
      return {
        ...state,
        groceries: []
      };
    case GET_GROCERIES:
      return {
        ...state,
        groceries: action.payload,
        loading: false
      };
    case ADD_SINGLEITEM:
      return {
        ...state,
        groceries: [action.payload, ...state.groceries]
      };
    case DELETE_SINGLEITEM:
      return {
        ...state,
        groceries: state.groceries.filter(item => item._id !== action.payload)
      };
    case BOUGHT_SINGLEITEM:
      return {
        ...state,
        groceries: state.groceries.map(item =>
          item._id === action.payload ? { ...item, bought: !item.bought } : item
        )
      };
    default:
      return state;
  }
}
