export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export function addItem(task){
  return {
    type: ADD_ITEM,
    task
  };
}

export function removeItem(task){
  return {
    type: REMOVE_ITEM,
    task
  }
}