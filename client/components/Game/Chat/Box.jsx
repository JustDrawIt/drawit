import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import uuid from 'uuid';
import ChatMessage from './Message';
import Button from '../../Utils/Button';
import Input from '../../Utils/Input';
import socket from '../../../sockets';

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
    socket.on('round:incorrect_guess', (data) => {
      this.setState({
        messages: [data, ...this.state.messages],
      });
    });

    socket.on('game:joined', (data) => {
      this.setState({
        messages: [{ nickname: null, message: `${data.nickname} joined the game!` }, ...this.state.messages],
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
    const { nickname, joinCode } = this.props;

    if (!nickname) {
      this.setState({ error: 'No Nickname' });
    } else {
      this.setState({ error: '' });
      socket.emit('round:guess', { message, nickname, joinCode });
    }
  }

  render() {
    const { messages, error } = this.state;

    return (
      <ChatContainer>
        <ChatWindow>
          {messages.map(message => (
            <ChatMessage
              key={uuid()}
              nickname={message.nickname}
              message={message.message}
            />
          ))}
        </ChatWindow>
        <Input onChange={this.setMessage} placeholder="Type a message!" type="text" />
        <Button onClick={this.sendMessage}>Send!</Button>
        {error ? <p>{error}</p> : null}
      </ChatContainer>
    );
  }
}

ChatBox.propTypes = {
  nickname: PropTypes.string.isRequired,
  joinCode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ nickname: state.game.nickname });

export default connect(mapStateToProps, null)(ChatBox);
