import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Centered from '../Utils/Centered';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

import axios from '../../axios';
import socket from '../../sockets';
import { setGameAction, setNicknameAction } from '../../store/actions/game.actions';

const Container = styled(Centered)`
  text-align: center;
`;

class NicknameForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
    };

    this.setNickname = this.setNickname.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.onGameNotJoined = this.onGameNotJoined.bind(this);
  }

  componentDidMount() {
    socket.on('game:not_joined', this.onGameNotJoined);
  }

  componentWillUnmount() {
    socket.off('game:not_joined', this.onGameNotJoined);
  }

  onGameNotJoined({ error }) {
    this.props.addNotification({ message: error, level: 'error' });
  }

  setNickname({ target }) {
    this.setState({ nickname: target.value });
  }

  joinGame() {
    const { nickname } = this.state;
    const {
      joinCode,
      isAdmin,
      dispatchGame,
      dispatchNickname,
      addNotification,
    } = this.props;

    !nickname
      ? addNotification({ message: 'Please enter a nickname', level: 'error' })
      : axios(`/games?joinCode=${joinCode}`)
        .then((response) => {
          const { game } = response.data;
          const hasNicknameAlready = game.players.find(player => player.nickname === nickname);
          const hasMaxPlayers = game.players.length >= game.maxPlayers;

          if (hasNicknameAlready) {
            addNotification({ message: 'Nickname already taken.', level: 'error', autoDismiss: 2 });
          } else if (hasMaxPlayers) {
            addNotification({ message: 'This game has reached the maximum amount of players.', level: 'error' });
          } else {
            dispatchGame(game);
            dispatchNickname(nickname);
            socket.emit('game:join', { nickname, joinCode, isAdmin });
          }
        })
        .catch(({ response }) => {
          const { error } = response.data;
          addNotification({ message: error, level: 'error' });
        });
  }

  render() {
    return (
      <Container>
        <h2>Enter A Nickname</h2>
        <Input onChange={this.setNickname} placeholder="Nickname" type="text" />
        <Button onClick={this.joinGame}>Join!</Button>
      </Container>
    );
  }
}

NicknameForm.propTypes = {
  dispatchGame: PropTypes.func.isRequired,
  dispatchNickname: PropTypes.func.isRequired,
  joinCode: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    isAdmin: game.isAdmin,
  }),
  dispatch => ({
    dispatchGame: setGameAction(dispatch),
    dispatchNickname: setNicknameAction(dispatch),
  }),
)(NicknameForm);
