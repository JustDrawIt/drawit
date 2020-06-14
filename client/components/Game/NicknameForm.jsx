import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Centered from '../Utils/Centered';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

const Container = styled(Centered)`
  text-align: center;
`;

class NicknameForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
    };

    this.setNickname = this.setNickname.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  setNickname({ target }) {
    this.setState({ nickname: target.value });
  }

  joinGame() {
    const { nickname } = this.state;
    const { addNotification, onJoinGame } = this.props;

    if (!nickname) {
      return addNotification({ message: 'Please enter a nickname', level: 'error' });
    }

    return onJoinGame(nickname);
  }

  render() {
    return (
      <Container>
        <h2>Enter A Nickname</h2>
        <Input onChange={this.setNickname} placeholder="Nickname" type="text" />
        <Button onClick={this.joinGame}>Join!</Button>
      </Container>
    );
  }
}

NicknameForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
  onJoinGame: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    isAdmin: game.isAdmin,
  }),
)(NicknameForm);
