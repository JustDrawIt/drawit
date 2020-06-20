import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Button from '../Utils/Button';
import { startAction } from '../../store/actions/game.actions';

const StartButton = styled(Button)`
  width: fit-content;
  min-width: 126px;
  padding: 8px 12px;
  margin: 0;
`;

const StartGame = (props) => {
  const { started, socket, dispatchStart } = props;

  const handleClick = () => {
    dispatchStart();
    socket.push('round:start');
  };

  return (
    <StartButton onClick={handleClick} disabled={started} color="primary">
      {started ? 'Starting...' : 'Start Game'}
    </StartButton>
  );
};

StartGame.propTypes = {
  socket: PropTypes.object.isRequired,
  started: PropTypes.bool.isRequired,
  dispatchStart: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    socket: game.socket,
    started: game.started,
  }),
  dispatch => ({
    dispatchStart: startAction(dispatch),
  }),
)(StartGame);
