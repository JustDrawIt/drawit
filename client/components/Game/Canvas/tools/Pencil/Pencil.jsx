import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import PencilTool, { TOOL_PENCIL } from './PencilTool';
import ToolButton from '../../../../Utils/ToolButton';

const Pencil = (props) => {
  const { dispatchTool } = props;

  const isActive = useSelector(state => (
    !!state.game.canvas.tool && (state.game.canvas.tool.name === TOOL_PENCIL)
  ));

  const handleClick = useCallback(() => {
    dispatchTool(new PencilTool());
  }, [dispatchTool]);

  return (
    <ToolButton onClick={handleClick} active={isActive}>
      <i className="fas fa-pencil-alt" />
    </ToolButton>
  );
};

Pencil.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Pencil);
