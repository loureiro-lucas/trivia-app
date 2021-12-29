import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TriviaContext from '../context/TriviaContext';

const Game = ({ history }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState({questionText: '', answerChosen: ''});

  const {
    questions,
    numberOfQuestions,
    questionsAnswered,
    setQuestionsAnswered,
    score,
    setScore,
  } = useContext(TriviaContext);

  useEffect(() => {
    randomizeCurrentQuestionAnswers();
  }, [currentQuestionIndex]);

  const randomizeCurrentQuestionAnswers = () => {
    const { correct_answer, incorrect_answers } = questions[currentQuestionIndex];
    const answers = [correct_answer, ...incorrect_answers];
    const CONTROL_PROBABILITY = 0.5;
    // Código da linha abaixo baseado no link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array resposta do usuário yuval.bl
    const answersRandomized = answers
      .sort(() => (Math.random() > CONTROL_PROBABILITY ? 1 : -1));

    setCurrentQuestionAnswers(answersRandomized);
  }

  const renderNextButton = () => (
    <button type="button" onClick={ handleNextButton }>
      Próxima pergunta
    </button>
  );

  const handleScore = (chosen, correct) => {
    chosen === correct && setScore(score + 1);
  }

  const answerQuestion = () => {
    const { questionText, answerChosen } = currentAnswer;
    const { correct_answer } = questions[currentQuestionIndex];

    handleScore(answerChosen, correct_answer);

    setQuestionsAnswered([
      ...questionsAnswered,
      { questionText, answerChosen, correct_answer },
    ]);

    setCurrentAnswer({
      questionText: '',
      answerChosen: '',
    });
  }

  const handleNextButton = () => {
    answerQuestion();
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const renderFinishButton = () => (
    <button type="button" onClick={ handleFinishButton }>
      Ver resultado
    </button>
  );

  const handleFinishButton = () => {
    answerQuestion();
    history.push('/');
  }

  const renderAnswers = () => (
    currentQuestionAnswers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        name={ answer }
        onClick={ handleClickAnswer }
      >
        { answer }
      </button>
    ))
  );

  const handleClickAnswer = ({ target: { name } }) => {
    setCurrentAnswer({
      questionText: questions[currentQuestionIndex].question,
      answerChosen: name,
    });
  }

  return (
    <>
      <Header />
      <div className="game-page-container">
        {questions.length > 0
        && (
          <div className="question-container">
            <p className="question-text">
              { questions[currentQuestionIndex].question }
            </p>
            <div className="question-answers">
              { renderAnswers() }
            </div>
          </div>
        )}
        { currentQuestionIndex < numberOfQuestions -1 ? renderNextButton() : renderFinishButton() }
      </div>
    </>
  )
}

export default Game;
