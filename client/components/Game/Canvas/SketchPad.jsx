import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setContextAction, setToolAction, addItemAction, clearItemsAction } from '../../../store/actions/game.actions';
import { DEFAULT_TOOL } from './defaults';
import tools from './tools';
import { BorderStyles } from '../../../styles';
import ClearTool from './tools/Clear/ClearTool';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const getCursorPosition = (canvas, { clientX, clientY }) => {
  const { top, left } = canvas.getBoundingClientRect();

  return {
    mouseX: clientX - left,
    mouseY: clientY - top,
  };
};

const SketchPad = (props) => {
  const {
    items,
    tool,
    channel,
    options,
    dispatchContext,
    dispatchTool,
    dispatchItem,
    dispatchClearItems,
    disabled: isDisabled,
  } = props;

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    const initialTool = new DEFAULT_TOOL(context, options);

    dispatchContext(context);
    dispatchTool(initialTool);
    dispatchClearItems();

    ClearTool.clear(context);
  }, [canvas]);

  useEffect(() => {
    const newItem = items.slice(-1)[0];

    if (newItem) {
      const context = canvas.current.getContext('2d');
      const Tool = tools[newItem.tool];
      const newTool = new Tool(context, newItem.options);

      newTool.drawItem(newItem);
    }
  }, [items]);

  const handleMouseDown = (event) => {
    if (!isDisabled) {
      const position = getCursorPosition(canvas.current, event);
      tool.onMouseDown(position);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDisabled) {
      const position = getCursorPosition(canvas.current, event);
      tool.onMouseMove(position);
    }
  };

  const handleMouseUp = (event) => {
    if (!isDisabled) {
      const position = getCursorPosition(canvas.current, event);
      const item = tool.onMouseUp(position);

      if (item) {
        channel.push('draw', { drawings: [item] });
        dispatchItem(item);
      }
    }
  };

  return (
    <canvas
      ref={canvas}
      css={BorderStyles}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseUp}
      onMouseUp={handleMouseUp}
      onBlur={handleMouseUp}
    />
  );
};

SketchPad.defaultProps = {
  tool: null,
};

SketchPad.propTypes = {
  channel: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  tool: PropTypes.object,
  options: PropTypes.object.isRequired,
  dispatchContext: PropTypes.func.isRequired,
  dispatchTool: PropTypes.func.isRequired,
  dispatchItem: PropTypes.func.isRequired,
  dispatchClearItems: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    channel: game.channel,
    items: game.canvas.items,
    tool: game.canvas.tool,
    options: game.canvas.options,
  }),
  dispatch => ({
    dispatchContext: setContextAction(dispatch),
    dispatchTool: setToolAction(dispatch),
    dispatchItem: addItemAction(dispatch),
    dispatchClearItems: clearItemsAction(dispatch),
  }),
)(SketchPad);
