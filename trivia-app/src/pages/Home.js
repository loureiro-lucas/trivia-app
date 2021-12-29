import React, { useContext, useEffect, useState } from 'react';
import TriviaContext from '../context/TriviaContext';

const Home = ({ history }) => {
  const [isNumberOfQuestionsChoosen, setIsNumberOfQuestionsChoosen] = useState(false);
  const [isLastGameResultsButtonDisabled, setIsLastGameResultsButtonDisabled] = useState(true)

  const {
    setQuestions,
    numberOfQuestions,
    setNumberOfQuestions,
    getQuestions,
    setQuestionsAnswered,
    setScore,
  } = useContext(TriviaContext);

  useEffect(() => {
    setQuestions([]);
    setNumberOfQuestions(0);
    setQuestionsAnswered([]);
    setScore(0);
    checkForPreviousGame();
  }, [])

  const handleChange = ({ target: { value } }) => setNumberOfQuestions(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNumberOfQuestionsChoosen(true);
  }

  const startGame = () => {
    getQuestions(numberOfQuestions)
      .then(() => {
        history.push('./game');
      });
  }

  const cancelGame = () => {
    setIsNumberOfQuestionsChoosen(false);
  }

  const renderForm = () => (
    <form onSubmit={ handleSubmit }>
      <label htmlFor='number-of-questions'>
        Quantas perguntas você deseja responder?
        <input
          type="number"
          id="number-of-questions"
          value={ numberOfQuestions }
          onChange={ handleChange }
        />
      </label>
      <button type="submit">
        Enviar
      </button>
    </form>
  );

  const renderConfirmation = () => (
    <>
      <p>Iniciar jogo?</p>
      <button type="button" onClick={ startGame }>
        Start
      </button>
      <button type="button" onClick={ cancelGame }>
        Cancel
      </button>
    </>
  );

  const checkForPreviousGame = () => {
    const lastGameResults = JSON.parse(localStorage.getItem('lastGame'));
    if (lastGameResults) {
      setIsLastGameResultsButtonDisabled(false);
    } else {
      setIsLastGameResultsButtonDisabled(true);
    }
  }

  const renderLastGameFeedbackButton = () => (
    <button
      type="button"
      onClick={ () => history.push('/feedback') }
      disabled={ isLastGameResultsButtonDisabled }
    >
      Ver resultados do jogo anterior
    </button>
  )

  return (
    <div className="homepage-container">
      <h1>Responda se puder!</h1>
      { isNumberOfQuestionsChoosen ? renderConfirmation() : renderForm() }
      { renderLastGameFeedbackButton() }
    </div>
  );
}

export default Home;
