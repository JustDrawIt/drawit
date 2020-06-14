import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import NotificationSystem from 'react-notification-system';
import styled from 'react-emotion';

import Flex from '../components/Utils/Flex';
import NicknameForm from '../components/Game/NicknameForm';
import CountDown from '../components/Game/CountDown';
import TopBar from '../components/Game/TopBar';
import ScoreBoard from '../components/Game/ScoreBoard';
import Canvas from '../components/Game/Canvas/Canvas';
import ChatBox from '../components/Game/Chat/Box';

import socket from '../sockets';
import axios from '../axios';
import {
  setJoinCodeAction,
  startAction,
  setGameAction,
  setNicknameAction,
  setSocketAction,
} from '../store/actions/game.actions';
import { keysSnakeToCamelCase } from '../helpers/snakeToCamelCase';
import { once } from '../helpers/once';

const Container = styled('div')`
  padding: 20px;
`;

const Game = styled(Flex)`
  width: 100%;
  position: relative;
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
      showScoreBoard: false,
    };

    this.onGameJoined = this.onGameJoined.bind(this);
    this.onGameEnd = this.onGameEnd.bind(this);
    this.onRoundStarted = this.onRoundStarted.bind(this);
    this.onRoundChosen = this.onRoundChosen.bind(this);
    this.onRoundCorrectGuess = this.onRoundCorrectGuess.bind(this);
    this.onRoundEnd = this.onRoundEnd.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.toggleScoreBoard = this.toggleScoreBoard.bind(this);
  }

  componentDidMount() {
    const { match, dispatchJoinCode } = this.props;
    const { joinCode } = match.params;

    dispatchJoinCode(joinCode);

    // this.channel
    //   .on('new_msg', msg => console.log('Got message', msg));
  }

  componentWillUnmount() {
  }

  onGameJoined({ game, nickname }) {
    this.setState({
      scores: game.players,
      joined: this.state.joined || nickname === this.props.nickname,
    });
  }

  onGameEnd({ word, scores }) {
    this.setState({
      scores,
      drawing: false,
      guessedCorrectly: false,
      gameEnded: true,
      showScoreBoard: true,
      endedWord: word,
    });
  }

  onRoundStarted() {
    this.props.dispatchStart();
    this.setState({
      roundEnded: false,
      endedWord: null,
      showScoreBoard: false,
    });
  }

  onRoundChosen({ word }) {
    this.setState({
      word,
      drawing: true,
      showScoreBoard: false,
    });
  }

  onRoundCorrectGuess({ nickname, scores }) {
    const { guessedCorrectly } = this.state;

    this.setState({
      scores,
      guessedCorrectly: guessedCorrectly || nickname === this.props.nickname,
    });
  }

  onRoundEnd({ word, scores }) {
    this.setState({
      scores,
      drawing: false,
      guessedCorrectly: false,
      roundEnded: true,
      showScoreBoard: true,
      endedWord: word,
    });
  }

  async handleJoinGame(nickname) {
    try {
      const { match, dispatchSocket, dispatchGame, dispatchNickname } = this.props;
      const { joinCode } = match.params;

      const response = await axios(`/api/games?join_code=${joinCode}`)
      const game = keysSnakeToCamelCase(response.data.data[0]);

      this.channel = socket.channel(`game:${joinCode}`, { nickname, token: 'testtoken' });

      dispatchSocket(this.channel);
      dispatchGame(game);
      dispatchNickname(nickname);

      this.channel
        .join()
        .receive('ok', once(async (okResponse) => {
          console.log('connected', okResponse);

          const response = await axios(`/api/games?join_code=${joinCode}`);
          const game = keysSnakeToCamelCase(response.data.data[0]);

          this.onGameJoined({
            game,
            nickname,
          });
        }))
        .receive('error', ({ reason }) => console.log('failed join', reason))
        .receive('timeout', () => console.log('Networking issue. Still waiting...'));
    } catch (error) {
      // const { error } = error.response.data;
      console.error(error);
      this.addNotification({ message: 'Something went wrong!', level: 'error' });
    }
  }

  toggleScoreBoard() {
    this.setState({ showScoreBoard: !this.state.showScoreBoard });
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
      guessedCorrectly,
      endedWord,
      roundEnded,
      gameEnded,
      showScoreBoard,
    } = this.state;
    const { joinCode } = match.params;
    const ended = roundEnded || gameEnded;
    const displayWord = (drawing && word) || (ended && endedWord);
    const canGuess = !drawing && !guessedCorrectly;

    return (
      <div>
        {
          !joined
          ? (
            <NicknameForm
              joinCode={joinCode}
              onJoinGame={this.handleJoinGame}
              addNotification={this.addNotification}
            />
          )
          : (
            <Container>
              {started && !roundEnded ? <CountDown date={new Date(89000)} /> : null}
              {started && roundEnded ? <CountDown date={new Date(14000)} /> : null}
              <TopBar
                isAdmin={isAdmin}
                started={started}
                drawing={drawing}
                word={displayWord}
                joinCode={joinCode}
                showingScoreBoard={showScoreBoard}
                addNotification={this.addNotification}
                toggleScoreBoard={this.toggleScoreBoard}
              />
              <Game>
                {
                  showScoreBoard
                  ? (
                    <ScoreBoard
                      scores={scores}
                      roundEnded={roundEnded}
                      gameEnded={gameEnded}
                    />
                  )
                  : null
                }
                <Canvas drawing={drawing} />
                <ChatBox
                  canGuess={canGuess}
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
  dispatchGame: PropTypes.func.isRequired,
  dispatchNickname: PropTypes.func.isRequired,
  dispatchSocket: PropTypes.func.isRequired,
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
    dispatchGame: setGameAction(dispatch),
    dispatchNickname: setNicknameAction(dispatch),
    dispatchSocket: setSocketAction(dispatch),
  }),
)(ScreenGame);

