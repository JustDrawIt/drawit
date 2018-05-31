import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ScreeenLogin from '../screens/ScreenLogin';
import ScreenCreateGame from '../screens/ScreenCreateGame';
import ScreenGame from '../screens/ScreenGame';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={ScreeenLogin} />
      <Route path="/create_game" component={ScreenCreateGame} />
      <Route path="/game/:id" component={ScreenGame} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default App;
