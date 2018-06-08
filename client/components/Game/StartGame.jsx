import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../Utils/Button';
import socket from '../../sockets';

class StartGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.start = this.start.bind(this);
  }

  componentDidMount() {
    socket.on('round:not_started', error => this.setState({ error }));
  }

  componentWillUnmount() {
    socket.off('round:not_started');
  }

  start() {
    const { joinCode } = this.props;

    socket.emit('round:start', { joinCode });
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <Button onClick={this.start}>Start Game</Button>
        {error ? <p>{error}</p> : null}
      </div>
    );
  }
}

StartGame.propTypes = {
  joinCode: PropTypes.string.isRequired,
};

export default connect(
  ({ game }) => ({
    joinCode: game.joinCode,
  }),
  null,
)(StartGame);
