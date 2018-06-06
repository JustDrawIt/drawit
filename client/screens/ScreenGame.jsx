import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import NicknameForm from '../components/Game/NicknameForm';
import ChatBox from '../components/Game/Chat/Box';
import Container from '../components/util/Centered';

const game = { players: ['jelani'] };
const ScreenGame = ({ match }) => (
  <Container>
    <NicknameForm game={game} joinCode={match.params.joinCode} />
    <ChatBox joinCode={match.params.joinCode} />
  </Container>
);

ScreenGame.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ScreenGame;
