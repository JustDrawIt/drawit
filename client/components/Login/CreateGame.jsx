import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import Button from '../util/Button';

const Container = styled('div')`
  text-align: center;
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
`;

const CreateGame = () => (
  <Container>
    <Button type="colored">
      <Link to="/create_game">Create a game</Link>
    </Button>
  </Container>
);

export default CreateGame;
