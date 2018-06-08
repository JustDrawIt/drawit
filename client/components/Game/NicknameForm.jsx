import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import axios from 'axios';
import Centered from '../Utils/Centered';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
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
      error: null,
    };

    this.setNickname = this.setNickname.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  setNickname({ target }) {
    this.setState({ nickname: target.value, error: '' });
  }

  joinGame() {
    const { joinCode, isAdmin, dispatchGame, dispatchNickname } = this.props;
    const { nickname } = this.state;

    if (!nickname) {
      this.setState({ error: 'Please enter a nickname!' });
    } else {
      axios(`/games?joinCode=${joinCode}`)
        .then((response) => {
          const { game } = response.data;
          const hasNicknameAlready = game.players.find(player => player.nickname === nickname);
          const hasMaxPlayers = game.players.length >= game.maxPlayers;

          if (hasNicknameAlready) {
            this.setState({ error: 'Nickname already taken.' });
          } else if (hasMaxPlayers) {
            this.setState({ error: 'This game has the maximum amount of players.' });
          } else {
            dispatchGame(game);
            dispatchNickname(nickname);
            socket.emit('game:join', { nickname, joinCode, isAdmin });
          }
        })
        .catch(error => this.setState({ error: error.message }));
    }
  }

  render() {
    const { error } = this.state;

    return (
      <Container>
        <h2>Enter A Nickname</h2>
        <Input onChange={this.setNickname} placeholder="Nickname" type="text" />
        <Button onClick={this.joinGame}>Join!</Button>
        {error ? <p>{error}</p> : null}
      </Container>
    );
  }
}

NicknameForm.propTypes = {
  dispatchGame: PropTypes.func.isRequired,
  dispatchNickname: PropTypes.func.isRequired,
  joinCode: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
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
