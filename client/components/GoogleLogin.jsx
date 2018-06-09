import React from 'react';
import styled from 'react-emotion';
import Button from './Utils/Button';

const Container = styled('div')`
  text-align: center;
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
`;


const GoogleLogin = () => (
  <Container>
    <a href="/auth/google">
      <Button color="primary"> Login !</Button>
    </a>
  </Container>
);

export default GoogleLogin;
