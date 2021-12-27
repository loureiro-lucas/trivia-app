import React from 'react';
import { Route } from 'react-router-dom';
import Game from '../pages/Game';
import Home from '../pages/Home';

const Routes = () => (
  <>
    <Route exact path="/" render={ () => <Home /> } />
    <Route path="/game" render={ () => <Game /> } />
  </>
);

export default Routes;
