import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import LineTool, { TOOL_LINE } from './LineTool';
import ToolButton from '../../../../Utils/ToolButton';

const Line = (props) => {
  const { dispatchTool } = props;

  const isActive = useSelector(state => (
    !!state.game.canvas.tool && (state.game.canvas.tool.name === TOOL_LINE)
  ));

  const handleClick = useCallback(() => {
    dispatchTool(new LineTool());
  }, [dispatchTool]);

  return (
    <ToolButton onClick={handleClick} active={isActive}>
      <i className="fas fa-ruler" />
    </ToolButton>
  );
};

Line.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Line);
