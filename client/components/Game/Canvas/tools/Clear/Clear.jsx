import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import ClearTool from './ClearTool';
import ToolButton from '../../../../Utils/ToolButton';
import { clearItemsAction } from '../../../../../store/actions/game.actions';

const Clear = (props) => {
  const { dispatchClearItems } = props;

  const channel = useSelector(state => state.game.channel);
  const context = useSelector(state => state.game.canvas.context);

  const handleClick = useCallback(() => {
    if (context) {
      ClearTool.clear(context);
      channel.push('clear_drawings');
      dispatchClearItems();
    }
  }, [context, channel, dispatchClearItems]);

  return (
    <ToolButton onClick={handleClick}>
      <i className="fas fa-trash-alt" />
    </ToolButton>
  );
};

Clear.propTypes = {
  dispatchClearItems: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchClearItems: clearItemsAction(dispatch),
  }),
)(Clear);
