import React from 'react';
import Container from '../components/util/Centered';
import GoogleLogin from '../components/GoogleLogin';

const ScreenLogin = () => (
  <div>
    <h2>Login</h2>
    <Container>
      <GoogleLogin />
    </Container>
  </div>
);

export default ScreenLogin;
