import React from 'react';
import CreateGameForm from '../components/CreateGameForm';
import Container from '../components/Utils/Centered';

const ScreenCreateGame = _props => (
  <Container>
    <h1>Create Game</h1>
    <CreateGameForm />
  </Container>
);

ScreenCreateGame.propTypes = {
};

export default ScreenCreateGame;
