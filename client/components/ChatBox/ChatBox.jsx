import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import socket from '../../sockets';
import Button from '../Util/Button';
import Input from '../Util/Input';

const ChatWindow = styled('div')`
    height: 400px;
    overflow: auto;
    background: #f9f9f9;
`;

const ChatMessage = styled('div')`
    padding: 14px 0px;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
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
    };

    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  setMessage({ target }) {
    this.setState({ message: target.value });
  }

  sendMessage() {
    const { message } = this.state;
    console.log(message, this.props.nickname);
    // emit message
    socket.emit('chat', { message, nickname: this.props.nickname });
  }

  // nickname in props
  render() {
    return (
      <ChatContainer>
        <ChatWindow>
          <ChatMessage>Chat Window </ChatMessage>
        </ChatWindow>
        <Input onChange={this.setMessage} placeholder="Type a message!" type="text" />
        <Button onClick={this.sendMessage}>Send!</Button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </ChatContainer>
    );
  }
}


export default ChatBox;
