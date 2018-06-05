import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import socket from '../../sockets';
import Button from '../Util/Button';
import Input from '../Util/Input';
import ChatMessage from './ChatMessage';

const ChatWindow = styled('div')`
    height: 400px;
    overflow: auto;
    background: #f9f9f9;
`;

const ChatContainer = styled('div')`
    max-width: 600px;
    margin: 30px auto;
    border: 1px solid #ddd;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.05);
    border-radius: 2px;
`;

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: '',
      messages: [],
    };
    // listen for chat events
    socket.on('chat', (data) => {
      this.setState({
        messages: [data, ...this.state.messages],
      });
    });
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  setMessage({ target }) {
    this.setState({ message: target.value });
  }

  sendMessage() {
    const { message } = this.state;
    // emit message, need to pass join code
    if (!this.props.nickname) {
      this.setState({ error: 'No Nickname' });
    } else {
      this.setState({ error: '' });
      socket.emit('chat', { message, nickname: this.props.nickname, });
    }
  }

  // nickname in props
  render() {
    return (
      <ChatContainer>
        <ChatWindow>
          {this.state.messages.map((message => (
            <ChatMessage key={Math.random()} nickname={message.nickname} message={message.message} > </ChatMessage>))) }
        </ChatWindow>
        <Input onChange={this.setMessage} placeholder="Type a message!" type="text" />
        <Button onClick={this.sendMessage}>Send!</Button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </ChatContainer>
    );
  }
}


export default ChatBox;
