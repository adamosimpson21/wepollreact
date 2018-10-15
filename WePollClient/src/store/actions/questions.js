import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_QUESTIONS, CREATE_QUESTION, GET_ONE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from "../actionTypes";

export const loadQuestions = questions => ({
  type: GET_QUESTIONS,
  questions
});

export const removeQuestion = questionId => ({
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
      .then(res => dispatch(loadQuestions(res))
      .catch(err => dispatch(addError(err.message)));
  }
}

export const postQuestion = body => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/questions/${id}`, body)
    .then(res => dispatch(createQuestion(res)))
    .catch(err => addError(err.message));
}

export const removeQuestionAction = question_id => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("delete", `/api/questions/${id}/${question_id}`)
    .then(() => dispatch(removeQuestion(question_id)))
    .catch(err => addError(err.message));
};

export const loadOneQuestionAction = question_id => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("get", `/api/questions/${id}/${question_id}`)
    .then(res => dispatch(loadOneQuestion(res)))
    .catch(err => addError(err.message));
}

export const updateQuestionAction = question_id => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("put", `/api/questions/${id}/${question_id}`)
    .then(res => dispatch(updateQuestion(res)))
    .catch(err => addError(err.message));
}