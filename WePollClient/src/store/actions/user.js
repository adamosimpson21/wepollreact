import { apiCall } from "../../services/api";
import { addError } from "./errors";
// import { USER_BUYS_COINS, USER_BUYS_ITEM } from '../actionTypes'
import { updateCurrentUser } from './auth'

// export const addCoins = coins => ({
//   type: USER_BUYS_COINS,
//   coins
// });
//
// export const buyItem = id => ({
//   type: USER_BUYS_ITEM,
//   id
// });

export const buyCoins = numCoins => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("put", `/api/user/${id}/coins`, {coins: numCoins})
    .then(updatedUser =>{
        dispatch(updateCurrentUser(updatedUser))
      })
    .catch(err => {
      addError(err.message);
    });
}

export const buyItem = itemId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/user/${id}/item/${itemId}`)
    .then(updatedUser =>{
      dispatch(updateCurrentUser(updatedUser))
    })
    .catch(err => {
      addError(err.message);
    });
}
