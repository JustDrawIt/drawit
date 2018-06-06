import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import CreateGameForm from '../components/CreateGameForm';
import Container from '../components/util/Centered';

const ScreenCreateGame = ({ history }) => (
  <div>
    <h2>Create Game</h2>
    <Container>
      <CreateGameForm history={history} />
    </Container>
  </div>
);


ScreenCreateGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenCreateGame;
