import React, { useState } from 'react';
import TriviaContext from './TriviaContext';
import fetchQuestions from '../services';
import PropTypes from 'prop-types';

const TriviaProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const [score, setScore] = useState(0);

  const getQuestions = (numberOfQuestions) => {
    return fetchQuestions(numberOfQuestions)
      .then((questionsFetched) => setQuestions(questionsFetched));
  }

  const context = {
    setQuestions,
    numberOfQuestions,
    setNumberOfQuestions,
    getQuestions,
    questions,
    questionsAnswered,
    setQuestionsAnswered,
    score,
    setScore,
  };

  return (
    <TriviaContext.Provider value={ context } >
      { children }
    </TriviaContext.Provider>
  );
}

TriviaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TriviaProvider;
