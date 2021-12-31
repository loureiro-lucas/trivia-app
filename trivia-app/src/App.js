import React from 'react';
import { Switch } from 'react-router-dom';
import TriviaProvider from './context/TriviaProvider';
import Routes from './routes';

function App() {
  return (
    <TriviaProvider>
      <Switch>
        <Routes />
      </Switch>
    </TriviaProvider>
  );
}

export default App;
