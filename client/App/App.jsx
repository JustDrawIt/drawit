import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import store from '../store';
import ScreeenLogin from '../screens/ScreenLogin';
import ScreeenPlay from '../screens/ScreenPlay';
import ScreenCreateGame from '../screens/ScreenCreateGame';
import ScreenGame from '../screens/ScreenGame';
import { injectGlobalStyles } from '../styles';

injectGlobalStyles();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ScreeenLogin} />
        <Route path="/play" component={ScreeenPlay} />
        <Route path="/create_game" component={ScreenCreateGame} />
        <Route path="/games/:joinCode" component={ScreenGame} />
        <Redirect to="/play" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
