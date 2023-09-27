// actions.js
import axios from "axios";
import {
  INPUT_CHANGE,
  RESET_FORM,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
} from "./action-types";

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(answer) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer,
  };
}

export function setQuiz() {
  return {
    type: SET_QUIZ_INTO_STATE,
  };
}

export function inputChange(evt) {
  return {
    type: INPUT_CHANGE,
    payload: evt.target,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE });
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: data });
      })
      .catch((err) => {
        console.error("Error fetching quiz:", err);
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: "Error fetching quiz data",
        });
      });
  };
}

export function postAnswer(answer) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", answer)
      .then(({ data }) => {
        console.log(data);
        
        dispatch({ type: SET_INFO_MESSAGE, payload: data.message });
        // If needed, dispatch the fetching of the next quiz here.
      })
      .then(()=>dispatch({type:SET_QUIZ_INTO_STATE}))
      .catch((err) => {
        console.error("Error posting answer:", err);
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting answer" });
      });
  };
}

export function postQuiz(quiz) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", quiz)
      .then((res) => {
        console.log(res)
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: `Congrats: "${quiz.question_text}" is a great question!`,
        });
        // If needed, dispatch the resetting of the form here.
      })
      .catch((err) => {
        console.error("Error posting new quiz:", err);
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: "Error posting new quiz",
        });
      });
  };
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
