import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';
import Flex from '../Utils/Flex';
import Button from '../Utils/Button';

const Container = styled('div')`
  position: absolute;
  width: calc(100% - 40px);
  height: fit-content;
  padding: 40px;
  margin: 20px;
  background: #00000030;
  color: #f8f8f8;
  z-index: 1;

  h1 {
    font-size: 38px;
    margin-bottom: 0;
  }
`;

const Score = styled(Flex)`
  width: 100%;
  border-bottom: 2px solid #f8f8f8;
  margin-top: 20px;
  font-size: 18px;

  span {
    margin-left: auto;
  }

  font-size: ${props => props.place + 17}px;
  ${props => (props.winner ? css`
    border-color: #3567FF;
    color: #3567FF;
  ` : null)}
`;

const LeaveGame = styled(Button)`
  transition: color 300ms ease-out;
  background: transparent !important;
  margin: 0 0 0 auto;
  padding: 0;
  font-size: 28px;
  width: unset;
  text-decoration: underline;

  :hover {
    color: #3567FF;
  }
`;

const sortByScore = (playerA, playerB) => {
  if (playerA.score === playerB.score) return 0;
  return playerA.score > playerB.score ? -1 : 1;
};

const ScoreBoard = ({ roundEnded, gameEnded, scores }) => (
  <Container>
    {roundEnded ? <h1>Round Ended</h1> : null}
    {!roundEnded && !gameEnded ? <h1>Scoreboard</h1> : null}
    {
      gameEnded
      ? (
        <Flex>
          <h1>Game Ended</h1>
          <LeaveGame>
            <Link to="/play">Leave</Link>
          </LeaveGame>
        </Flex>
      )
      : null
    }
    {scores.sort(sortByScore).map((player, index) => (
      <Score winner={gameEnded && index === 0} place={player.score} key={player._id}>
        <b>{player.nickname}</b>
        <span>{player.score}</span>
      </Score>
    ))}
  </Container>
);

ScoreBoard.propTypes = {
  roundEnded: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  scores: PropTypes.array.isRequired,
};

export default ScoreBoard;
