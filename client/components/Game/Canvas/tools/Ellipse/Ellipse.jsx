import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import EllipseTool, { TOOL_ELLIPSE } from './EllipseTool';
import ToolButton from '../../../../Utils/ToolButton';

const Ellipse = (props) => {
  const { dispatchTool } = props;

  const isActive = useSelector(state => (
    !!state.game.canvas.tool && (state.game.canvas.tool.name === TOOL_ELLIPSE)
  ));

  const handleClick = useCallback(() => {
    dispatchTool(new EllipseTool());
  }, [dispatchTool]);

  return (
    <ToolButton onClick={handleClick} active={isActive}>
      <i className="far fa-circle" />
    </ToolButton>
  );
};

Ellipse.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Ellipse);
