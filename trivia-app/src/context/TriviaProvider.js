import React from 'react';
import TriviaContext from './TriviaContext';

const TriviaProvider = ({ children }) => {
  const context = {};
  
  return (
    <TriviaContext.Provider value={ context } >
      { children }
    </TriviaContext.Provider>
  )
}

export default TriviaProvider;
