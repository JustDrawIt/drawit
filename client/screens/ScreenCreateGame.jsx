import React from 'react';
import styled from 'react-emotion';
import ReactRouterPropTypes from 'react-router-prop-types';
import CreateGameForm from '../components/CreateGame/CreateGameForm';

const Container = styled('div')`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ScreenCreateGame = ({ history }) => (
  <div>
    <h2><b>Create Game</b></h2>
    <Container>
      <CreateGameForm />
    </Container>
  </div>
);


ScreenCreateGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ScreenCreateGame;
