import React, { useContext } from 'react';
import Header from '../components/Header';
import TriviaContext from '../context/TriviaContext';

const Feedback = () => {
  const {
    questionsAnswered,
  } = useContext(TriviaContext);

  const renderQuestionFeedback = ({ questionText, answerChosen, correct_answer }) => (
    <div className="feedback-question-container">
      <p className="feedback-question-text">
        { questionText }
      </p>
      <p className="feedback-question-answer-chosen">
        Sua resposta:{ ` ${answerChosen}` }
      </p>
      <p className="feedback-question-correct-answer">
        Resposta correta:{ ` ${correct_answer}` }
      </p>
    </div>
  );
  
  return (
    <>
      <Header />
      <div className="feedback-page-container">

      </div>
    </>
  )
}

export default Feedback;
