import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import NotificationSystem from 'react-notification-system';
import styled from 'react-emotion';

import Flex from '../components/Utils/Flex';
import TopBar from '../components/Game/TopBar';
import Canvas from '../components/Game/Canvas/Canvas';
import ChatBox from '../components/Game/Chat/Box';
import NicknameForm from '../components/Game/NicknameForm';

import socket from '../sockets';
import { setJoinCodeAction, startAction } from '../store/actions/game.actions';

const Container = styled('div')`
  padding: 20px;
`;

const Game = styled(Flex)`
  width: 100%;
`;

class ScreenGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      word: null,
      scores: [],
      joined: false,
      drawing: false,
      endedWord: null,
      roundEnded: false,
      gameEnded: false,
    };

    this.addNotification = this.addNotification.bind(this);
    this.onGameJoined = this.onGameJoined.bind(this);
    this.onGameEnd = this.onGameEnd.bind(this);
    this.onRoundStarted = this.onRoundStarted.bind(this);
    this.onRoundChosen = this.onRoundChosen.bind(this);
    this.onRoundEnd = this.onRoundEnd.bind(this);
  }

  componentDidMount() {
    const { match, dispatchJoinCode } = this.props;
    const { joinCode } = match.params;

    dispatchJoinCode(joinCode);

    socket.on('game:joined', this.onGameJoined);
    socket.on('game:end', this.onGameEnd);
    socket.on('round:started', this.onRoundStarted);
    socket.on('round:chosen', this.onRoundChosen);
    socket.on('round:end', this.onRoundEnd);
  }

  componentWillUnmount() {
    socket.off('game:joined', this.onGameJoined);
    socket.off('game:end', this.onGameEnd);
    socket.off('round:started', this.onRoundStarted);
    socket.off('round:chosen', this.onRoundChosen);
    socket.off('round:end', this.onRoundEnd);
  }

  onGameJoined({ nickname }) {
    this.setState({ joined: this.state.joined || nickname === this.props.nickname });
  }

  onGameEnd({ word, scores }) {
    this.setState({
      scores,
      drawing: false,
      gameEnded: true,
      endedWord: word,
    });
  }

  onRoundStarted() {
    this.props.dispatchStart();
    this.setState({ roundEnded: false, endedWord: null });
  }

  onRoundChosen({ word }) {
    this.setState({
      word,
      drawing: true,
      roundEnded: true,
    });
  }

  onRoundEnd({ word, scores }) {
    this.setState({
      scores,
      drawing: false,
      roundEnded: true,
      endedWord: word,
    });
  }

  addNotification(notification) {
    this.notificationSystem.addNotification(notification);
  }

  render() {
    const {
      match,
      nickname,
      isAdmin,
      started,
    } = this.props;
    const {
      word,
      scores,
      joined,
      drawing,
      endedWord,
      roundEnded,
      gameEnded,
    } = this.state;
    const { joinCode } = match.params;

    return (
      <div>
        {
          !joined
          ? <NicknameForm joinCode={joinCode} addNotification={this.addNotification} />
          : (
            <Container>
              <TopBar
                isAdmin={isAdmin}
                started={started}
                drawing={drawing}
                word={word}
                joinCode={joinCode}
                addNotification={this.addNotification}
              />
              {/* {roundEnded ?
                  <div>
                    <p>ROUND ENDED</p>
                    <p>WORD WAS {endedWord}</p>
                  </div>
                  : null
                }
                {gameEnded ? 'GAME ENDED!' : null} */}
              <Game>
                <Canvas drawing={drawing} />
                <ChatBox
                  drawing={drawing}
                  nickname={nickname}
                  joinCode={joinCode}
                  addNotification={this.addNotification}
                />
              </Game>
            </Container>
          )
        }
        <NotificationSystem
          ref={(notificationSystem) => { this.notificationSystem = notificationSystem; }}
        />
      </div>
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

