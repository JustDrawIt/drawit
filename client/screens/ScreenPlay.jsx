import React from 'react';
import styled from '@emotion/styled';
import JoinGame from '../components/Play/Join';
import CreateGame from '../components/Play/CreateGame';
import Centered from '../components/Utils/Centered';

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
  span {
    font-size: 19px;
    display: block;
  }
`;

const ScreenPlay = _props => (
  <Background>
    <Container>
      <h1>Draw It!</h1>
      <JoinGame />
      <span>or</span>
      <CreateGame />
    </Container>
  </Background>
);

ScreenPlay.propTypes = {
};

export default ScreenPlay;
