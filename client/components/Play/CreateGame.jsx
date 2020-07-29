import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import Button from '../Utils/Button';

const Container = styled('div')`
  text-align: center;
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
`;

const CreateGame = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Button color="primary">
        <Link to="/create_game">{t('play.createGame.linkText')}</Link>
      </Button>
    </Container>
  );
};

export default CreateGame;
