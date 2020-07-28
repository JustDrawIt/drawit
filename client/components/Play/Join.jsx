import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import axios from '../../axios';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

const JoinGame = (props) => {
  const { history } = props;

  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (joinCode.length < 7) {
      return setError('Join code must be at least 7 chars long.');
    }

    axios.get('/api/games', { params: { join_code: joinCode } })
      .then(response => (response.data.data[0]
        ? history.push(`/games/${joinCode}`)
        : setError('There are no games with that join code!')
      ))
      .catch(() => setError('There are no games with that join code!'));
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
        placeholder="Join code"
        type="text"
      />
      <Button onClick={handleJoin}>Play!</Button>
      {error ? <p>{error}</p> : null}
    </div>
  );
};

JoinGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default JoinGame;
