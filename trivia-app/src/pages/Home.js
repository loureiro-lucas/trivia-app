import React, { useContext, useState } from 'react';
import TriviaContext from '../context/TriviaContext';

const Home = ({ history }) => {
  const [isNumberOfQuestionsChoosen, setIsNumberOfQuestionsChoosen] = useState(false);
  const { numberOfQuestions, setNumberOfQuestions, getQuestions } = useContext(TriviaContext);

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

  return (
    <>
      <h1>Responda se puder!</h1>
      { isNumberOfQuestionsChoosen ? renderConfirmation() : renderForm() }
    </>
  );
}

export default Home;
