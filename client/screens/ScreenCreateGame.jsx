import React from 'react';
import { useTranslation } from 'react-i18next';
import CreateGameForm from '../components/CreateGameForm';
import Container from '../components/Utils/Centered';

const ScreenCreateGame = (_props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <h1>{t('createGame.title')}</h1>
      <CreateGameForm />
    </Container>
  );
};

ScreenCreateGame.propTypes = {
};

export default ScreenCreateGame;
