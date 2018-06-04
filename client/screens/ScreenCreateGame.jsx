import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import CreateGameForm from '../components/CreateGame/CreateGameForm';

const ScreenCreateGame = ({ history }) => (
  <div>
    <CreateGameForm />
  </div>
);


ScreenCreateGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenCreateGame;
