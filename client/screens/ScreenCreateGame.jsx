import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import CreateGameForm from '../components/CreateGameForm';
import Container from '../components/Utils/Centered';

const ScreenCreateGame = ({ history }) => (
  <Container>
    <h1>Create Game</h1>
    <CreateGameForm history={history} />
  </Container>
);

ScreenCreateGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenCreateGame;
