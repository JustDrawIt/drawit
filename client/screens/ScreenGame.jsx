import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
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
  setGameAction,
  setNicknameAction,
  setChannelAction,
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

const ScreenGame = (props) => {
  const {
    match,
    dispatchChannel,
    dispatchGame,
    dispatchNickname,
    dispatchSetCurrentRound,
  } = props;

  const { joinCode } = match.params;

  const channel = useSelector(state => state.game.channel);
  const nickname = useSelector(state => state.game.nickname);
  const isAdmin = useSelector(state => state.game.isAdmin);
  const started = useSelector(state => state.game.started);
  const game = useSelector(state => state.game.game);
  const currentRound = useSelector(state => state.game.currentRound);

  const [joined, setJoined] = useState(false);
  const [endedWord, setEndedWord] = useState(null);
  const [roundEnded, setRoundEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const notificationSystem = useRef();
  const channelEventRefs = useRef({
    startRound: null,
    endRound: null,
    correctGuess: null,
  });

  const addNotification = (notification) => {
    if (notificationSystem.current) {
      notificationSystem.current.addNotification(notification);
    }
  };

  const handleGameJoined = ({ game, player }) => {
    setJoined(true);
    setCurrentPlayer(player);

    localStorage.setItem(`game:${game.joinCode}:token`, player.token);
  };

  const handleGameEnd = ({ word }) => {
    setGameEnded(true);
    setShowScoreBoard(true);
    setEndedWord(word);
    setGuessedCorrectly(false);
  };

  const handleChannelError = (payload) => {
    console.error(payload);

    let message = 'Something went wrong!';

    if (payload === 'nickname_taken') {
      message = 'Nickname taken.';
    }

    addNotification({ message, level: 'error' });
  };

  const handleRoundStart = useCallback((payload) => {
    const { round } = keysSnakeToCamelCase(payload);

    dispatchSetCurrentRound(round);

    setRoundEnded(false);
    setEndedWord(null);
    setShowScoreBoard(false);
  }, [dispatchSetCurrentRound]);

  const handleRoundEnd = useCallback((payload) => {
    const { game } = keysSnakeToCamelCase(payload);

    dispatchGame(game);
    dispatchSetCurrentRound(null);

    setRoundEnded(true);
    setShowScoreBoard(true);
    setGuessedCorrectly(false);
  }, [dispatchGame, dispatchSetCurrentRound]);

  const handleCorrectGuess = () => {
    setGuessedCorrectly(true);
  };

  const toggleScoreBoard = () => {
    setShowScoreBoard(currentlyShowing => !currentlyShowing);
  };

  const handleJoinGame = async (nickname) => {
    try {
      const response = await axios(`/api/games?join_code=${joinCode}`);
      const game = keysSnakeToCamelCase(response.data.data[0]);

      const token = localStorage.getItem(`game:${joinCode}:token`) || undefined;
      const channel = socket.channel(`game:${joinCode}`, { nickname, token });

      dispatchChannel(channel);
      dispatchGame(game);
      dispatchNickname(nickname);

      channel.onError(handleChannelError);

      channel
        .join()
        .receive('ok', once(async (okResponse) => {
          const { player } = keysSnakeToCamelCase(okResponse);
          console.log('connected', okResponse);

          const response = await axios(`/api/games?join_code=${joinCode}`);
          const game = keysSnakeToCamelCase(response.data.data[0]);

          handleGameJoined({
            game,
            player,
          });
        }))
        .receive('error', once((error) => {
          channel.leave();
          handleChannelError(error);
        }));
    } catch (error) {
      handleChannelError(error);
    }
  };

  useEffect(() => {
    if (currentRound) {
      setEndedWord(currentRound.word);
    }
  }, [currentRound]);

  useEffect(() => {
    if (!joined) {
      return;
    }

    channelEventRefs.current.startRound = channel.on('start_round', handleRoundStart);
    channelEventRefs.current.endRound = channel.on('end_round', handleRoundEnd);
    channelEventRefs.current.correctGuess = channel.on('correct_guess', handleCorrectGuess);

    const { startRound, endRound, correctGuess } = channelEventRefs.current;

    return () => {
      if (channel) {
        channel.off('start_round', startRound);
        channel.off('end_round', endRound);
        channel.off('correct_guess', correctGuess);
      }
    };
  }, [joined, channel, handleRoundEnd, handleRoundStart]);

  if (!joined) {
    return (
      <React.Fragment>
        <NicknameForm onJoinGame={handleJoinGame} addNotification={addNotification} />
        <NotificationSystem ref={notificationSystem} />
      </React.Fragment>
    );
  }

  const ended = roundEnded || gameEnded;
  const isDrawer = !!(currentRound && currentRound.playerDrawer.nickname === nickname);
  const displayWord = (isDrawer && currentRound && currentRound.word) || (ended && endedWord);
  const canGuess = !isDrawer && !guessedCorrectly;

  return (
    <React.Fragment>
      <Container>
        {game && started && !roundEnded ? <CountDown date={new Date(game.roundLengthMs)} /> : null}
        {started && roundEnded ? <CountDown date={new Date(5000)} /> : null}
        <TopBar
          isAdmin={isAdmin}
          started={started}
          word={displayWord}
          joinCode={joinCode}
          showingScoreBoard={showScoreBoard}
          toggleScoreBoard={toggleScoreBoard}
        />
        <Game>
          {showScoreBoard && (
            <ScoreBoard
              scores={(game && game.players) || []}
              roundEnded={roundEnded}
              gameEnded={gameEnded}
            />
          )}
          <Canvas drawing={isDrawer} />
          <ChatBox
            canGuess={canGuess}
            nickname={nickname}
            addNotification={addNotification}
          />
        </Game>
      </Container>
      <NotificationSystem ref={notificationSystem} />
    </React.Fragment>
  );
};

ScreenGame.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  dispatchJoinCode: PropTypes.func.isRequired,
  dispatchGame: PropTypes.func.isRequired,
  dispatchNickname: PropTypes.func.isRequired,
  dispatchChannel: PropTypes.func.isRequired,
  dispatchSetCurrentRound: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchJoinCode: setJoinCodeAction(dispatch),
    dispatchGame: setGameAction(dispatch),
    dispatchNickname: setNicknameAction(dispatch),
    dispatchChannel: setChannelAction(dispatch),
    dispatchSetCurrentRound: setCurrentRoundAction(dispatch),
  }),
)(ScreenGame);
