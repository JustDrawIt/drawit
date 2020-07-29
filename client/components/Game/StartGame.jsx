import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '../Utils/Button';
import { startAction } from '../../store/actions/game.actions';

const StartButton = styled(Button)`
  width: fit-content;
  min-width: 126px;
  padding: 8px 12px;
  margin: 0;
`;

const StartGame = (props) => {
  const { started, channel, dispatchStart } = props;

  const { t } = useTranslation();

  const handleClick = () => {
    dispatchStart();
    channel.push('start');
  };

  return (
    <StartButton onClick={handleClick} disabled={started} color="primary">
      {started ? t('game.startGame.starting') : t('game.startGame.start')}
    </StartButton>
  );
};

StartGame.propTypes = {
  channel: PropTypes.object.isRequired,
  started: PropTypes.bool.isRequired,
  dispatchStart: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    channel: game.channel,
    started: game.started,
  }),
  dispatch => ({
    dispatchStart: startAction(dispatch),
  }),
)(StartGame);
