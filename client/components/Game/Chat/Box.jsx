import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import socket from '../../../sockets';
import ChatMessage from './Message';
import {
  Container,
  WindowStyles,
  EnterMessage,
  MessageInput,
  MessageButton,
} from './styles';

const Window = React.forwardRef((props, ref) => (
  <div ref={ref} className={WindowStyles}>{props.children}</div>
));

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: '',
    };

    this.chatWindowRef = React.createRef();
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onGameJoined = this.onGameJoined.bind(this);
    this.onRoundIncorrectGuess = this.onRoundIncorrectGuess.bind(this);
  }

  componentDidMount() {
    const { nickname } = this.props;

    this.onGameJoined({ nickname });

    socket.on('game:joined', this.onGameJoined);
    socket.on('round:incorrect_guess', this.onRoundIncorrectGuess);
  }

  componentWillUnmount() {
    socket.off('game:joined', this.onGameJoined);
    socket.off('round:incorrect_guess', this.onRoundIncorrectGuess);
  }

  onGameJoined({ nickname }) {
    const joinedMessage = `${nickname} joined the game`;
    this.addMessage({ message: joinedMessage, nickname: null });
  }

  onRoundIncorrectGuess(message) {
    this.addMessage(message);
  }

  onKeyPress({ key }) {
    if (key === 'Enter') {
      this.sendMessage();
    }
  }

  setMessage({ target }) {
    this.setState({ newMessage: target.value });
  }

  scrollChatWindowToBottom() {
    const chatWindow = this.chatWindowRef.current;
    chatWindow.scrollTo(0, chatWindow.scrollHeight);
  }

  addMessage(message) {
    this.setState(
      { messages: [...this.state.messages, message] },
      () => this.scrollChatWindowToBottom(),
    );
  }

  sendMessage() {
    const { nickname, joinCode } = this.props;
    const { newMessage } = this.state;

    if (!newMessage) {
      this.props.addNotification({
        message: 'Please enter a message',
        level: 'error',
        autoDismiss: 2,
      });
    } else {
      this.setState({ newMessage: '' });
      socket.emit('round:guess', { message: newMessage, nickname, joinCode });
    }
  }

  render() {
    const { messages, newMessage } = this.state;
    const { canGuess } = this.props;

    return (
      <Container>
        <Window ref={this.chatWindowRef}>
          {messages.map(message => (
            <ChatMessage
              key={uuid()}
              nickname={message.nickname}
              message={message.message}
            />
          ))}
        </Window>
        <EnterMessage>
          <MessageInput
            onChange={this.setMessage}
            onKeyPress={this.onKeyPress}
            value={newMessage}
            disabled={!canGuess}
            placeholder="Make a guess"
            type="text"
          />
          <MessageButton onClick={this.sendMessage} disabled={!canGuess}>
            <i className="far fa-paper-plane" />
          </MessageButton>
        </EnterMessage>
      </Container>
    );
  }
}

ChatBox.propTypes = {
  canGuess: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  joinCode: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default ChatBox;
