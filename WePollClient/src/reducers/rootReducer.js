import { ADD_ITEM, REMOVE_ITEM } from '../actions/actionsCreators'

const initialState = {
  items: [],
  id:0
}

export default function rootReducer(state = initialState, action){
  switch(action.type){
    case ADD_ITEM:
      let newState = {...state};
      newState.id++
      return {
        ...newState,
        items: [...newState.items, {task: action.task, id:newState.id}]
      }
    case REMOVE_ITEM:
      let items = state.items.filter(value => value.id !==action.id);
      return {...state, items}
    default:
      return state;
  }
}