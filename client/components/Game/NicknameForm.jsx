import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Centered from '../Utils/Centered';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import socket from '../../sockets';
import { setNicknameAction } from '../../store/actions/game.actions';

const Container = styled(Centered)`
  text-align: center;
`;

class NicknameForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      error: '',
      verified: false,
    };

    this.setNickname = this.setNickname.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  setNickname({ target }) {
    this.setState({ nickname: target.value, error: '' });
  }

  // verify nickname, makesure no duplicates, return promise, set verified to true;
  verifyNickname(nickname) {
    this.setState({ verified: true });
  }

  joinGame() {
    const { joinCode, isAdmin } = this.props;
    const { nickname } = this.state;

    if (!nickname) {
      this.setState({ error: 'Please enter a nickname!' });
    } else {
      this.props.dispatchNickname(nickname);
      this.verifyNickname(nickname);
      socket.emit('game:join', { nickname, joinCode, isAdmin });
    }
  }

  render() {
    const { error, verified } = this.state;
    if (!verified) {
      return (
        <Container>
          <h2>Enter A Nickname</h2>
          <Input onChange={this.setNickname} placeholder="Nickname" type="text" />
          <Button onClick={this.joinGame}>Join!</Button>
          {error ? <p>{error}</p> : null}
        </Container>
      );
    }
    return (<div></div>);
  }
}

NicknameForm.propTypes = {
  dispatchNickname: PropTypes.func.isRequired,
  joinCode: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default connect(
  ({ game }) => ({
    isAdmin: game.isAdmin,
  }),
  dispatch => ({
    dispatchNickname: setNicknameAction(dispatch),
  }),
)(NicknameForm);
