import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import items from "./items";

const rootReducer = combineReducers({
  currentUser,
  errors,
  items
});

export default rootReducer;
