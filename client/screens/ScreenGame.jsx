import React from 'react';
import styled from 'react-emotion';
import NicknameForm from '../components/NicknameForm/NicknameForm';

const Container = styled('div')`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const game = { players: ['jelani'] };
const ScreenGame = () => (
  <div>
    <Container>
      <NicknameForm game={game} />
    </Container>
  </div>
);

export default ScreenGame;
