import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../axios';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

const JoinGame = (_props) => {
  const { t } = useTranslation();

  const history = useHistory();

  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (joinCode.length < 7) {
      return setError(t('error.joinCodeLength'));
    }

    axios.get('/api/games', { params: { join_code: joinCode } })
      .then(response => (response.data.data[0]
        ? history.push(`/games/${joinCode}`)
        : setError(t('error.joinCodeNotFound'))
      ))
      .catch(() => setError(t('error.unspecific')));
  };

  const handleChangeJoinCode = event => setJoinCode(event.target.value);
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <div>
      <Input
        onChange={handleChangeJoinCode}
        onKeyPress={handleInputKeyPress}
        placeholder={t('play.join.joinCodePlaceholder')}
        type="text"
      />
      <Button onClick={handleJoin}>{t('play.join.submit')}</Button>
      {error ? <p>{error}</p> : null}
    </div>
  );
};

JoinGame.propTypes = {
};

export default JoinGame;
