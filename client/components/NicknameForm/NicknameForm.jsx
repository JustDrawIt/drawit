import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Button from '../Util/Button';
import Input from '../Util/Input';
import socket from '../../sockets';
import gameActions from '../../store/actions/game.actions';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

class NicknameForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: '',
    };

    this.setNicknameState = this.setNicknameState.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  setNicknameState({ target }) {
    this.setState({ nickname: target.value, error: '' });
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
    return (
      <Container>
        <h2><b>Enter A Nickname</b></h2>
        <Input onChange={this.setNicknameState} placeholder="Nickname" type="text" />
        <Button onClick={this.joinGame}>Join!</Button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </Container>
    );
  }
}

export default connect(null, gameActions)(NicknameForm);
