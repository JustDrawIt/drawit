import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const Message = styled('div')`
  padding-bottom: 14px;
  color: #555;
  font-size: 18px;
  b {
    display: block;
  }
`;

const ChatMessage = ({ nickname, message }) => (
  <Message>
    {
      !nickname
      ? <i>{message}</i>
      : (
        <div>
          <b>{nickname}</b>
          <span>{message}</span>
        </div>
      )
    }
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
