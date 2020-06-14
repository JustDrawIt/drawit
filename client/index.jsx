import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './sockets';

ReactDOM.render(<App />, document.getElementById('app'));
