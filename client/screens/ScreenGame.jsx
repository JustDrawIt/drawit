import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Flex from '../components/Utils/Flex';
import Canvas from '../components/Game/Canvas/Canvas';
import ChatBox from '../components/Game/Chat/Box';
import StartGame from '../components/Game/StartGame';
import NicknameForm from '../components/Game/NicknameForm';
import { setJoinCodeAction } from '../store/actions/game.actions';

class ScreenGame extends PureComponent {
  componentDidMount() {
    const { dispatchJoinCode, match } = this.props;
    const { joinCode } = match.params;

    dispatchJoinCode(joinCode);
  }

  render() {
    const { match, nickname, isAdmin } = this.props;
    const { joinCode } = match.params;

    return (nickname
      ?
        <div>
          <Flex>
            <Canvas />
            <ChatBox joinCode={joinCode} />
          </Flex>
          {isAdmin ? <StartGame /> : null}
        </div>
      :
        <NicknameForm joinCode={joinCode} />
    );
  }
}

ScreenGame.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  nickname: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  dispatchJoinCode: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    nickname: game.nickname,
    isAdmin: game.isAdmin,
  }),
  dispatch => ({
    dispatchJoinCode: setJoinCodeAction(dispatch),
  }),
)(ScreenGame);

