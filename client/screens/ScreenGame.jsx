import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NicknameForm from '../components/Game/NicknameForm';
import Canvas from '../components/Game/Canvas/Canvas';
import ChatBox from '../components/Game/Chat/Box';
import Container from '../components/util/Centered';
import Flex from '../components/util/Flex';

const game = { players: ['jelani'] };
const ScreenGame = ({ match, nickname }) => {
  if (nickname) {
    return (
      <Flex >
        <Canvas />
        <ChatBox joinCode={match.params.joinCode} />
      </Flex >
    );
  }
  return (
    <Container>
      <NicknameForm game={game} joinCode={match.params.joinCode} />
    </Container>
  );
};

ScreenGame.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  nickname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ nickname: state.game.nickname });

export default connect(mapStateToProps, null)(ScreenGame);

