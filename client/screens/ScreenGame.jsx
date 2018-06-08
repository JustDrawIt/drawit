import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Flex from '../components/Utils/Flex';
import Canvas from '../components/Game/Canvas/Canvas';
import ChatBox from '../components/Game/Chat/Box';
import StartGame from '../components/Game/StartGame';
import NicknameForm from '../components/Game/NicknameForm';

import { setJoinCodeAction, startAction } from '../store/actions/game.actions';
import socket from '../sockets';

const Word = styled('div')`
  font-size: 18px;
  padding: 20px;
`;

class ScreenGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      word: null,
      scores: [],
      drawing: false,
      endedWord: null,
      roundEnded: false,
      gameEnded: false,
    };
  }

  componentDidMount() {
    const { match, dispatchJoinCode } = this.props;
    const { joinCode } = match.params;

    dispatchJoinCode(joinCode);

    socket.on('round:started', () => {
      this.props.dispatchStart();
      this.setState({ roundEnded: false, endedWord: null });
    });
    socket.on('round:chosen', ({ word }) => this.setState({
      word,
      drawing: true,
      roundEnded: true,
    }));
    socket.on('round:end', ({ word, scores }) => this.setState({
      scores,
      drawing: false,
      roundEnded: true,
      endedWord: word,
    }));
    socket.on('game:end', ({ word, scores }) => this.setState({
      scores,
      drawing: false,
      gameEnded: true,
      endedWord: word,
    }));
  }

  componentWillUnmount() {
    socket.off('round:started');
    socket.off('round:chosen');
    socket.off('round:end');
    socket.off('game:end');
  }

  render() {
    const { match, nickname, isAdmin, started } = this.props;
    const {
      word,
      scores,
      drawing,
      endedWord,
      roundEnded,
      gameEnded,
    } = this.state;
    const { joinCode } = match.params;

    return (nickname
      ?
        <div>
          {roundEnded ?
            <div>
              <p>ROUND ENDED</p>
              <p>WORD WAS {endedWord}</p>
            </div>
            : null
          }
          {gameEnded ? 'GAME ENDED!' : null}
          {drawing ? <Word>{word}</Word> : null}
          <Flex>
            <Canvas drawing={drawing} />
            <ChatBox drawing={drawing} joinCode={joinCode} />
          </Flex>
          {isAdmin && !started ? <StartGame /> : null}
        </div>
      :
        <NicknameForm joinCode={joinCode} />
    );
  }
}

ScreenGame.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  nickname: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
  dispatchJoinCode: PropTypes.func.isRequired,
  dispatchStart: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    nickname: game.nickname,
    isAdmin: game.isAdmin,
    started: game.started,
  }),
  dispatch => ({
    dispatchJoinCode: setJoinCodeAction(dispatch),
    dispatchStart: startAction(dispatch),
  }),
)(ScreenGame);

