import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClearTool from './ClearTool';
import ToolButton from '../../../../Utils/ToolButton';
import { clearItemsAction } from '../../../../../store/actions/game.actions';

class Clear extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { context, dispatchClearItems, channel } = this.props;

    if (context) {
      ClearTool.clear(context);
      channel.push('clear_drawings');
      dispatchClearItems();
    }
  }

  render() {
    return (
      <ToolButton onClick={this.onClick}>
        <i className="fas fa-trash-alt" />
      </ToolButton>
    );
  }
}

Clear.defaultProps = {
  context: null,
};

Clear.propTypes = {
  channel: PropTypes.object,
  context: PropTypes.object,
  joinCode: PropTypes.string.isRequired,
  dispatchClearItems: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    channel: game.socket,
    context: game.canvas.context,
    joinCode: game.joinCode,
  }),
  dispatch => ({
    dispatchClearItems: clearItemsAction(dispatch),
  }),
)(Clear);
