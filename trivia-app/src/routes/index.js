import React from 'react';
import { Route } from 'react-router-dom';
import Feedback from '../pages/Feedback';
import Game from '../pages/Game';
import Home from '../pages/Home';

const Routes = () => (
  <>
    <Route exact path="/" render={ (props) => <Home { ...props } /> } />
    <Route path="/game" render={ (props) => <Game { ...props } /> } />
    <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
  </>
);

export default Routes;
