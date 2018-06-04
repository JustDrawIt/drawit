import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import JoinGame from '../components/Login/Join';
import CreateGame from '../components/Login/CreateGame';

const ScreenLogin = ({ history }) => (
  <div>
    <JoinGame history={history} />
    <CreateGame />
  </div>
);

ScreenLogin.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenLogin;
