import React from 'react';
import styled from 'react-emotion';


const ChatMessageStyle = styled('div') `
    padding: 14px 0px;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
`;

const ChatMessage = props => (
  <ChatMessageStyle>
      Nickname: {props.nickname} Message: {props.message}
  </ChatMessageStyle>
);

export default ChatMessage;
