import React from 'react';
import styled from 'react-emotion';
import ReactRouterPropTypes from 'react-router-prop-types';
import CreateGameForm from '../components/CreateGameForm';

const Container = styled('div')`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
