import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Centered from '../Utils/Centered';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

const NicknameForm = (props) => {
  const { addNotification, onJoinGame } = props;

  const [nickname, setNickname] = useState('');

  const handleChangeNickname = event => setNickname(event.target.value);
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.joinGame();
    }
  };
  const handleJoinGame = () => {
    if (!nickname) {
      return addNotification({ message: 'Please enter a nickname', level: 'error' });
    }
    return onJoinGame(nickname);
  };

  return (
    <Centered>
      <h2>Enter A Nickname</h2>
      <Input
        onChange={handleChangeNickname}
        onKeyPress={handleInputKeyPress}
        placeholder="Nickname"
        type="text"
      />
      <Button onClick={handleJoinGame}>Join!</Button>
    </Centered>
  );
};

NicknameForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
  onJoinGame: PropTypes.func.isRequired,
};

export default NicknameForm;
