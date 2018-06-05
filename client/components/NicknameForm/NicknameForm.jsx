import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import Button from '../Util/Button';
import Input from '../Util/Input';
import socket from '../../sockets';
import ChatBox from '../ChatBox/ChatBox';

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

    this.setNickname = this.setNickname.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  setNickname({ target }) {
    this.setState({ nickname: target.value, error: '' });
  }

  joinGame() {
    const { nickname } = this.state;
    if (!nickname) {
      this.setState({ error: 'Please enter a nickname!' });
    } else {
      if (!this.props.game.players.includes(nickname)) {
        socket.emit('join', { nickname });
      } else {
        this.setState({ error: 'Nickname already exists!' });
      }
    }
  }

  render() {
    return (
      <div>
        <Container>
          <h2><b>Enter A Nickname</b></h2>
          <Input onChange={this.setNickname} placeholder="Nickname" type="text" />
          <Button onClick={this.joinGame}>Join!</Button>
          {this.state.error ? <p>{this.state.error}</p> : null}
        </Container>
        <ChatBox nickname={this.state.nickname} />
      </div>
    );
  }
}


export default NicknameForm;
