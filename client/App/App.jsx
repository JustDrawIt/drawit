import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import store from '../store';
import ScreeenLogin from '../screens/ScreenLogin';
import ScreenCreateGame from '../screens/ScreenCreateGame';
import ScreenGame from '../screens/ScreenGame';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ScreeenLogin} />
        <Route path="/create_game" component={ScreenCreateGame} />
        <Route path="/games/:joinCode" component={ScreenGame} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
