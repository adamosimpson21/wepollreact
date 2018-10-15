import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_QUESTIONS, CREATE_QUESTION, GET_ONE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from "../actionTypes";

export const loadQuestions = questions => ({
  type: GET_QUESTIONS,
  questions
});

export const removeQuestions = questionId => ({
  type: DELETE_QUESTION,
  questionId
});

export const createQuestion = question => ({
  type: CREATE_QUESTION,
  question
})

export const loadOneQuestion = question => ({
  type: GET_ONE_QUESTION,
  question
})

export const updateQuestion = question => ({
  type: UPDATE_QUESTION,
  question
})

export const getAllQuestions = () => {
  return dispatch => {
    return apiCall("get", "/api/questions")
      .then(res => {
        dispatch(loadQuestions(res))
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  }
}

export const postItem = body => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/items/${id}`, body)
    .then(res => {
      dispatch(addItem(res))
    })
    .catch(err => addError(err.message));
};

export const removeItem = item_id => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("delete", `/api/items/${id}/${item_id}`)
    .then(() => dispatch(remove(item_id)))
    .catch(err => {
      addError(err.message);
    });
};