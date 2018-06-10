import React from 'react';
import styled from 'react-emotion';
import Centered from './Utils/Centered';
import Button from './Utils/Button';

const Container = styled(Centered)`
  text-align: center;
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
`;

const GoogleLogin = () => (
  <Container>
    <a href="/auth/google">
      <Button color="primary">Login with Google</Button>
    </a>
  </Container>
);

export default GoogleLogin;
