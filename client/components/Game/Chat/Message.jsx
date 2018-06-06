import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const Message = styled('div')`
  padding: 14px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
  color: #555;
`;

const ChatMessage = ({ nickname, message }) => (
  <Message>
    {nickname ? <b>{nickname}</b> : null}
    <p>{message}</p>
  </Message>
);

ChatMessage.propTypes = {
  nickname: PropTypes.string,
  message: PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
  nickname: '',
};

export default ChatMessage;
