import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import store from './store';

import './sockets';
import './i18n';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
