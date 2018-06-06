import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Button from '../util/Button';
import Input from '../util/Input';
import socket from '../../sockets';
import gameActions from '../../store/actions/game.actions';

const Container = styled('div')`
  text-align: center;
`;

class NicknameForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      error: '',
    };

    this.setNicknameState = this.setNickname.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  setNickname({ target }) {
    this.setState({ nickname: target.value });
  }

  joinGame() {
    const { nickname } = this.state;
    const { joinCode } = this.props;

    if (!nickname) {
      this.setState({ error: 'Please enter a nickname!' });
    } else {
      this.props.setNickname(nickname);
      socket.emit('game:join', { nickname, joinCode });
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
  setNickname: PropTypes.func.isRequired,
  joinCode: PropTypes.string.isRequired,
};

export default connect(null, gameActions)(NicknameForm);
