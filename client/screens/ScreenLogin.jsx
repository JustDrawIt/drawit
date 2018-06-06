import React from 'react';
import styled from 'react-emotion';
import ReactRouterPropTypes from 'react-router-prop-types';
import JoinGame from '../components/Login/Join';
import CreateGame from '../components/Login/CreateGame';
import Centered from '../components/util/Centered';

const Background = styled('div')`
  width: 100%;
  height: 100%;
  background: #FF9000;
`;

const Container = styled(Centered)`
  background: #fefefe;
  border-radius: 30px;
  padding: 80px 110px 120px 110px;
  h1 {
    min-width: 8ch;
    font-family: 'Pacifico', cursive;
    font-size: 4rem;
    margin-bottom: 70px;
  }
`;

const ScreenLogin = ({ history }) => (
  <Background>
    <Container>
      <h1>Draw It!</h1>
      <JoinGame history={history} />
      <CreateGame />
    </Container>
  </Background>
);

ScreenLogin.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenLogin;
