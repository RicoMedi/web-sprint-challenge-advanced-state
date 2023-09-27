import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

export function Quiz({ quiz, fetchQuiz, postAnswer, selectAnswer, selected }) {
  if (!quiz) {
    useEffect(() => {
      fetchQuiz();
    }, []);
  }

  const submit = () => {
    if (selected) {
      const answer = {
        quiz_id: quiz.quiz_id,
        answer_id: selected.answer_id
      };
      postAnswer(answer);
    }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer, idx) => {
                return (
                  <div className={selected === answer ? 'answer selected' : 'answer'} key={idx}>
                    {answer.text}
                    <button onClick={() => selectAnswer(answer)}>
                      {selected === answer ? 'SELECTED' : 'select'}
                    </button>
                  </div>
                );
              })}
            </div>

            <button id="submitAnswerBtn" onClick={() => submit()} disabled={selected ? false : true}>
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selected: state.selectedAnswer
  };
};

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);

