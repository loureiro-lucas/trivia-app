import React, { useContext } from 'react';
import Header from '../components/Header';
import TriviaContext from '../context/TriviaContext';

const Feedback = () => {
  const {
    questionsAnswered,
    score,
    numberOfQuestions,
  } = useContext(TriviaContext);

  const renderScore = () => (
    <div className="feedback-score-container">
      <p>
        {
          `${numberOfQuestions} ${numberOfQuestions === 1
            ? 'pergunta respondida'
            : 'perguntas respondidas'}...`
        }
      </p>
      <p>
        {
          `${score} ${score === 1
            ? 'acerto.'
            : 'acertos.'}`
        }
      </p>
      <p>
        {
          `${numberOfQuestions - score} ${numberOfQuestions - score === 1
            ? 'erro.'
            : 'erros.'}`
        }
      </p>
    </div>
  );

  const renderQuestionFeedback = ({ questionText, answerChosen, correct_answer }, index) => (
    <div className="feedback-question-container" key={ index }>
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
        { renderScore() }
        {
          questionsAnswered.map((questionAnswered, index) => {
            return renderQuestionFeedback(questionAnswered, index);
          })
        }
      </div>
    </>
  )
}

export default Feedback;
