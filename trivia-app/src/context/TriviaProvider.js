import React, { useState } from 'react';
import TriviaContext from './TriviaContext';
import fetchQuestions from '../services';

const TriviaProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = (numberOfQuestions) => {
    fetchQuestions(numberOfQuestions)
      .then((questionsFetched) => setQuestions(questionsFetched));
  }

  const context = {
    getQuestions,
    questions,
  };
  
  return (
    <TriviaContext.Provider value={ context } >
      { children }
    </TriviaContext.Provider>
  )
}

export default TriviaProvider;
