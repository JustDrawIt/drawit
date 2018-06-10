import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Button from '../Utils/Button';
import socket from '../../sockets';

const StartButton = styled(Button)`
  width: fit-content;
  min-width: 126px;
  padding: 8px 12px;
  margin: 0;
`;

class StartGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      starting: false,
    };

    this.start = this.start.bind(this);
    this.onRoundNotStarted = this.onRoundNotStarted.bind(this);
  }

  componentDidMount() {
    socket.on('round:not_started', this.onRoundNotStarted);
  }

  componentWillUnmount() {
    socket.off('round:not_started', this.onRoundNotStarted);
  }

  onRoundNotStarted({ error }) {
    const { addNotification } = this.props;

    this.setState({ starting: false });
    addNotification({ message: error, level: 'error' });
  }

  start() {
    const { joinCode } = this.props;

    this.setState({ starting: true });
    socket.emit('round:start', { joinCode });
  }

  render() {
    const { starting } = this.state;

    return (
      <div>
        <StartButton onClick={this.start} disabled={starting} color="primary">
          {starting ? 'Starting...' : 'Start Game'}
        </StartButton>
      </div>
    );
  }
}

StartGame.propTypes = {
  joinCode: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    joinCode: game.joinCode,
  }),
  null,
)(StartGame);
