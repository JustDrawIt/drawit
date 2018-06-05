import React from 'react';
import styled from 'react-emotion';
import NicknameForm from '../components/NicknameForm/NicknameForm';
import ChatBox from '../components/ChatBox/ChatBox';

const Container = styled('div')`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const game = { players: ['jelani'] };
const ScreenGame = ({ match }) => (
  <Container>
    <NicknameForm game={game} joinCode={match.params.joinCode} />
    <ChatBox joinCode={match.params.joinCode} />
  </Container>
);

export default ScreenGame;
