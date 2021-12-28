import React, { useState } from 'react';
import TriviaContext from './TriviaContext';
import fetchQuestions from '../services';

const TriviaProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  // const [answered, setAnswered] = useState({});

  const getQuestions = (numberOfQuestions) => {
    return fetchQuestions(numberOfQuestions)
      .then((questionsFetched) => setQuestions(questionsFetched));
  }

  const context = {
    numberOfQuestions,
    setNumberOfQuestions,
    getQuestions,
    questions,
  };

  return (
    <TriviaContext.Provider value={ context } >
      { children }
    </TriviaContext.Provider>
  );
}

export default TriviaProvider;
