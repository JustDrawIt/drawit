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
  setCurrentRoundAction,
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
      scores: [],
      joined: false,
      endedWord: null,
      roundEnded: false,
      gameEnded: false,
      showScoreBoard: false,
    };

    this.onGameJoined = this.onGameJoined.bind(this);
    this.onGameEnd = this.onGameEnd.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.toggleScoreBoard = this.toggleScoreBoard.bind(this);
    this.handleRoundStart = this.handleRoundStart.bind(this);
    this.handleRoundEnd = this.handleRoundEnd.bind(this);
    this.handleCorrectGuess = this.handleCorrectGuess.bind(this);

    this.socketRefs = {};
  }

  componentDidMount() {
    const { match, dispatchJoinCode } = this.props;
    const { joinCode } = match.params;

    dispatchJoinCode(joinCode);
  }

  componentWillUnmount() {
    const { channel } = this.props;

    if (channel) {
      channel.off('round:start', this.socketRefs.roundStart);
      channel.off('round:end', this.socketRefs.roundEnd);
      channel.off('correct_guess', this.socketRefs.correctGuess);
    }
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
      guessedCorrectly: false,
      gameEnded: true,
      showScoreBoard: true,
      endedWord: word,
    });
  }

  setRoundEventListeners() {
    const { channel } = this.props;

    this.socketRefs.roundStart = channel.on('round:start', this.handleRoundStart);
    this.socketRefs.roundEnd = channel.on('round:end', this.handleRoundEnd);
    this.socketRefs.correctGuess = channel.on('correct_guess', this.handleCorrectGuess);
  }

  async handleJoinGame(nickname) {
    try {
      const { match, dispatchSocket, dispatchGame, dispatchNickname } = this.props;
      const { joinCode } = match.params;

      const response = await axios(`/api/games?join_code=${joinCode}`)
      const game = keysSnakeToCamelCase(response.data.data[0]);

      const channel = socket.channel(`game:${joinCode}`, { nickname, token: 'testtoken' });

      dispatchSocket(channel);
      dispatchGame(game);
      dispatchNickname(nickname);

      this.setRoundEventListeners();

      channel
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

  handleRoundStart(payload) {
    const { round } = keysSnakeToCamelCase(payload);

    this.props.dispatchSetCurrentRound(round);
    this.setState({
      roundEnded: false,
      endedWord: null,
      showScoreBoard: false,
    });
  }

  handleRoundEnd(payload) {
    const lastWord = this.props.currentRound.word;

    this.props.dispatchSetCurrentRound(null);
    this.setState({
      scores: [],
      guessedCorrectly: false,
      roundEnded: true,
      showScoreBoard: true,
      endedWord: lastWord,
    });
  }

  handleCorrectGuess() {
    this.setState({
      scores: [],
      guessedCorrectly: true,
    });
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
      game,
      currentRound,
    } = this.props;
    const {
      scores,
      joined,
      guessedCorrectly,
      endedWord,
      roundEnded,
      gameEnded,
      showScoreBoard,
    } = this.state;
    const { joinCode } = match.params;
    const ended = roundEnded || gameEnded;
    const isDrawer = !!(currentRound && currentRound.playerDrawer.nickname === nickname);
    const displayWord = (isDrawer && currentRound && currentRound.word) || (ended && endedWord);
    const canGuess = !isDrawer && !guessedCorrectly;

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
              {started && !roundEnded ? <CountDown date={new Date(game.roundLengthMs)} /> : null}
              {started && roundEnded ? <CountDown date={new Date(5000)} /> : null}
              <TopBar
                isAdmin={isAdmin}
                started={started}
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
                <Canvas drawing={isDrawer} />
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
  channel: PropTypes.object,
  nickname: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
  game: PropTypes.object,
  currentRound: PropTypes.object,
  dispatchJoinCode: PropTypes.func.isRequired,
  dispatchStart: PropTypes.func.isRequired,
  dispatchGame: PropTypes.func.isRequired,
  dispatchNickname: PropTypes.func.isRequired,
  dispatchSocket: PropTypes.func.isRequired,
  dispatchSetCurrentRound: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    channel: game.socket,
    nickname: game.nickname,
    isAdmin: game.isAdmin,
    started: game.started,
    game: game.game,
    currentRound: game.currentRound,
  }),
  dispatch => ({
    dispatchJoinCode: setJoinCodeAction(dispatch),
    dispatchStart: startAction(dispatch),
    dispatchGame: setGameAction(dispatch),
    dispatchNickname: setNicknameAction(dispatch),
    dispatchSocket: setSocketAction(dispatch),
    dispatchSetCurrentRound: setCurrentRoundAction(dispatch),
  }),
)(ScreenGame);

