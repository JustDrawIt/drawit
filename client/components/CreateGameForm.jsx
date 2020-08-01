import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import axios from '../axios';
import Button from './Utils/Button';
import Input from './Utils/Input';
import { setGameAction, setIsAdminAction } from '../store/actions/game.actions';
import { keysSnakeToCamelCase } from '../helpers/snakeToCamelCase';
import i18n from '../i18n';

const Container = styled('div')`
  label span {
    display: block;
    text-align: left;
  }

  button {
    margin: 10px 0;
    padding: 10px;
  }

  button, input {
    width: 100%;
  }
`;

const CreateGameForm = (props) => {
  const { dispatchGame, dispatchIsAdmin } = props;

  const { t } = useTranslation();

  const history = useHistory();

  const [maxPlayers, setMaxPlayers] = useState(5);
  const [maxRounds, setMaxRounds] = useState(5);
  const [error, setError] = useState(null);

  const handleChangeMaxPlayers = event => setMaxPlayers(event.target.value);
  const handleChangeMaxRounds = event => setMaxRounds(event.target.value);
  const handleCreateGame = () => {
    const language = i18n.language.slice(0, 2);
    const newGamePayload = {
      game: {
        max_players: maxPlayers,
        max_rounds: maxRounds,
        language,
      },
    };

    axios.post('/api/games', newGamePayload)
      .then((response) => {
        const game = keysSnakeToCamelCase(response.data.data);

        dispatchGame(game);
        dispatchIsAdmin(true);

        history.push(`/games/${game.joinCode}`);
      })
      .catch(({ response }) => {
        console.error(response.data.error);
        setError(t('error.unspecific'));
      });
  };

  return (
    <Container>
      <div>
        <label htmlFor="max-rounds">
          <span>{t('createGame.maxRoundsLabel')}</span>
          <Input onChange={handleChangeMaxRounds} value={maxRounds} id="max-rounds" type="number" />
        </label>
      </div>
      <div>
        <label htmlFor="max-players">
          <span>{t('createGame.maxPlayersLabel')}</span>
          <Input onChange={handleChangeMaxPlayers} value={maxPlayers} id="max-players" type="number" />
        </label>
      </div>
      <div>
        <Button onClick={handleCreateGame}>{t('createGame.submit')}</Button>
      </div>
      {error ? <p>{error}</p> : null}
    </Container>
  );
};

CreateGameForm.propTypes = {
  dispatchGame: PropTypes.func.isRequired,
  dispatchIsAdmin: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchGame: setGameAction(dispatch),
    dispatchIsAdmin: setIsAdminAction(dispatch),
  }),
)(CreateGameForm);
