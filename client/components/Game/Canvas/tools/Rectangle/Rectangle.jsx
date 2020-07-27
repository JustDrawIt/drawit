import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import RectangleTool, { TOOL_RECTANGLE } from './RectangleTool';
import ToolButton from '../../../../Utils/ToolButton';

const Rectangle = (props) => {
  const { dispatchTool } = props;

  const isActive = useSelector(state => (
    !!state.game.canvas.tool && (state.game.canvas.tool.name === TOOL_RECTANGLE)
  ));

  const handleClick = useCallback(() => {
    dispatchTool(new RectangleTool());
  }, [dispatchTool]);

  return (
    <ToolButton onClick={handleClick} active={isActive}>
      <i className="far fa-square" />
    </ToolButton>
  );
};

Rectangle.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Rectangle);
