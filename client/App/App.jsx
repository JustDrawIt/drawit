import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ScreenLogin from '../screens/ScreenLogin';
import ScreenPlay from '../screens/ScreenPlay';
import ScreenCreateGame from '../screens/ScreenCreateGame';
import ScreenGame from '../screens/ScreenGame';
import { injectGlobalStyles } from '../styles';

injectGlobalStyles();

const App = () => (
  <Switch>
    <Route path="/login" component={ScreenLogin} />
    <Route path="/play" component={ScreenPlay} />
    <Route path="/create_game" component={ScreenCreateGame} />
    <Route path="/games/:joinCode" component={ScreenGame} />
    <Redirect to="/play" />
  </Switch>
);

export default App;
