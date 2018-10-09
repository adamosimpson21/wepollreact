import { ADD_ITEM, REMOVE_ITEM, LOAD_ITEMS } from '../actionTypes'

const DEFAULT_STATE = {
  items: []
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      return {
        items: [...action.items]
      }
    case ADD_ITEM:
      return{
        items: [...action.items]
      }
    case REMOVE_ITEM:
      return {
        items: [state.items.filter(item => item._id !== action.id)]
      }
    default:
      return state;
  }
};