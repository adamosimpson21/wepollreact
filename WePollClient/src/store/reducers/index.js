import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import items from "./items";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  items
});

export default rootReducer;
