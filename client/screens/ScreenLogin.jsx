import React from 'react';
import styled from 'react-emotion'
import ReactRouterPropTypes from 'react-router-prop-types';
import JoinGame from '../components/Login/Join';
import CreateGame from '../components/Login/CreateGame';

const Container = styled('div')`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ScreenLogin = ({ history }) => (
  <Container>
    <JoinGame history={history} />
    <CreateGame />
  </Container>
);

ScreenLogin.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenLogin;
