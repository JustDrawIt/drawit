import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Centered from '../Utils/Centered';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

const NicknameForm = (props) => {
  const { addNotification, onJoinGame } = props;

  const { t } = useTranslation();

  const [nickname, setNickname] = useState('');

  const handleJoinGame = () => {
    if (!nickname) {
      return addNotification({ message: t('error.nicknameMissing'), level: 'error' });
    }
    return onJoinGame(nickname);
  };
  const handleChangeNickname = event => setNickname(event.target.value);
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleJoinGame();
    }
  };

  return (
    <Centered>
      <h2>{t('game.setNickname.title')}</h2>
      <Input
        onChange={handleChangeNickname}
        onKeyPress={handleInputKeyPress}
        placeholder={t('game.setNickname.nicknamePlaceholder')}
        type="text"
      />
      <Button onClick={handleJoinGame}>{t('game.setNickname.submit')}</Button>
    </Centered>
  );
};

NicknameForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
  onJoinGame: PropTypes.func.isRequired,
};

export default NicknameForm;
