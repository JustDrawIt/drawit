import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NicknameForm from '../components/Game/NicknameForm';
import Canvas from '../components/Game/Canvas/Canvas';
import ChatBox from '../components/Game/Chat/Box';
import Container from '../components/util/Centered';
import Flex from '../components/util/Flex';
import { setJoinCodeAction } from '../store/actions/game.actions';

class ScreenGame extends PureComponent {
  componentDidMount() {
    const { dispatchJoinCode, match } = this.props;
    const { joinCode } = match.params;

    dispatchJoinCode(joinCode);
  }

  render() {
    const { match, nickname } = this.props;
    const { joinCode } = match.params;

    return (
      <div>
        {nickname
        ?
          <Flex>
            <Canvas />
            <ChatBox joinCode={joinCode} />
          </Flex>
        :
          <Container>
            <NicknameForm joinCode={joinCode} />
          </Container>
        }
      </div>
    );
  }
}

ScreenGame.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  nickname: PropTypes.string.isRequired,
  dispatchJoinCode: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    nickname: game.nickname,
  }),
  dispatch => ({
    dispatchJoinCode: setJoinCodeAction(dispatch),
  }),
)(ScreenGame);

