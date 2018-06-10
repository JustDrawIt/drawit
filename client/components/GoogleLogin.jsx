import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import Button from './Utils/Button';

const Container = styled('div')`
  text-align: center;
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
`;

class GoogleLogin extends PureComponent {
  componentDidMount() {
    window.location = '/auth/google';
  }

  render() {
    return (
      <Container>
        <a href="/auth/google">
          <Button color="primary">Login with Google</Button>
        </a>
      </Container>
    );
  }
}

export default GoogleLogin;
