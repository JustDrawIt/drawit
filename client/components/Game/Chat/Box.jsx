import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
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

    this.socketRefs = {};
  }

  componentDidMount() {
    const { nickname, channel } = this.props;

    this.onGameJoined({ nickname });

    this.socketRefs.handleNewMessage = channel.on('new_message', this.onRoundIncorrectGuess);
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.off('new_message', this.socketRefs.handleNewMessage);
  }

  onGameJoined({ nickname }) {
    const joinedMessage = `${nickname} joined the game`;
    this.addMessage({ message: joinedMessage, nickname: null });
  }

  onRoundIncorrectGuess({ text, player }) {
    this.addMessage({
      message: text,
      nickname: player && player.nickname,
    });
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
    const { channel } = this.props;
    const { newMessage } = this.state;

    if (!newMessage) {
      this.props.addNotification({
        message: 'Please enter a message',
        level: 'error',
        autoDismiss: 2,
      });
    } else {
      this.setState({ newMessage: '' });
      channel.push('new_message', { text: newMessage }, 10000);
    }
  }

  render() {
    const { messages, newMessage } = this.state;
    const { canGuess } = this.props;

    return (
      <Container>
        <Window ref={this.chatWindowRef}>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
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
  channel: PropTypes.object.isRequired,
  canGuess: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  joinCode: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    channel: game.socket,
  }),
)(ChatBox);
