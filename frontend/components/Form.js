import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";




export function Form(props) {
  const validateValues = () => {
    if (
      props.form.newQuestion.trim() &&
      props.form.newTrueAnswer.trim() &&
      props.form.newFalseAnswer.trim()
    ) {
      return false;
    } else {
      return true;
    }
  };
  const quiz = {
    question_text: props.form.newQuestion,
    true_answer_text: props.form.newTrueAnswer,
    false_answer_text: props.form.newFalseAnswer,
  };

  

  const onChange = (evt) => {
    
    props.inputChange(evt);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz(quiz);
    props.resetForm();
    
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        value={props.form.newQuestion} 
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        value={props.form.newTrueAnswer} 
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        value={props.form.newFalseAnswer} 
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={validateValues()}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
