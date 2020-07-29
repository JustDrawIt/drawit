import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
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

const sortByScore = (playerA, playerB) => playerB.score - playerA.score;

const ScoreBoard = ({ roundEnded, gameEnded, scores }) => {
  const { t } = useTranslation();

  return (
    <Container>
      {roundEnded ? <h1>{t('game.scoreboard.titleRoundEnded')}</h1> : null}
      {!roundEnded && !gameEnded ? <h1>{t('game.scoreboard.titleInProgress')}</h1> : null}
      {
        gameEnded
        ? (
          <Flex>
            <h1>{t('game.scoreboard.titleGameEnded')}</h1>
            <LeaveGame>
              <Link to="/play">{t('game.scoreboard.leave')}</Link>
            </LeaveGame>
          </Flex>
        )
        : null
      }
      {scores.slice().sort(sortByScore).map((player, index) => (
        <Score winner={gameEnded && index === 0} place={player.score} key={player.id}>
          <b>{player.nickname}</b>
          <span>{player.score}</span>
        </Score>
      ))}
    </Container>
  );
};

ScoreBoard.propTypes = {
  roundEnded: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  scores: PropTypes.array.isRequired,
};

export default ScoreBoard;
