import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ChatMessage from './Message';
import {
  Container,
  WindowStyles,
  EnterMessage,
  MessageInput,
  MessageButton,
} from './styles';

const scrollToBottom = element => element.scrollTo(0, element.scrollHeight);

const ChatBox = (props) => {
  const { nickname, canGuess, addNotification } = props;

  const channel = useSelector(state => state.game.channel);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const pushMessage = message => setMessages(currentMessages => [
    ...currentMessages,
    message,
  ]);

  const chatWindow = useRef(null);
  const channelEventRefs = useRef({
    newMessage: null,
  });

  const handleNewMessage = ({ text, player }) => pushMessage({
    message: text,
    nickname: player && player.nickname,
  });

  const handleChangeMessage = event => setNewMessage(event.target.value);

  const handleSendMessage = useCallback(() => {
    if (!newMessage) {
      return addNotification({
        message: 'Please enter a message',
        level: 'error',
        autoDismiss: 2,
      });
    }

    setNewMessage('');
    channel.push('new_message', { text: newMessage }, 10000);
  }, [newMessage, addNotification, channel]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    pushMessage({
      message: `${nickname} joined the game`,
      nickname: null,
    });

    channelEventRefs.current.newMessage = channel.on('new_message', handleNewMessage);

    return () => {
      channel.off('new_message', channelEventRefs.current.newMessage);
    };
  }, []);

  useEffect(() => {
    if (chatWindow.current) {
      scrollToBottom(chatWindow.current);
    }
  }, [messages, chatWindow]);

  return (
    <Container>
      <div ref={chatWindow} css={WindowStyles}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            nickname={message.nickname}
            message={message.message}
          />
        ))}
      </div>
      <EnterMessage>
        <MessageInput
          onChange={handleChangeMessage}
          onKeyPress={handleKeyPress}
          value={newMessage}
          disabled={!canGuess}
          placeholder="Make a guess"
          type="text"
        />
        <MessageButton onClick={handleSendMessage} disabled={!canGuess}>
          <i className="far fa-paper-plane" />
        </MessageButton>
      </EnterMessage>
    </Container>
  );
};

ChatBox.propTypes = {
  canGuess: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default ChatBox;
