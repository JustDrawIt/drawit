import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SketchPad from './SketchPad';
import Tools from './tools/Tools';
import ClearTool from './tools/Clear/ClearTool';
import Options from './options/Options';
import { addItemAction, clearItemsAction } from '../../../store/actions/game.actions';

const Canvas = (props) => {
  const {
    channel,
    context,
    dispatchClearItems,
    dispatchItem,
    drawing: isDrawing,
  } = props;

  const handleDraw = (payload) => {
    const { drawings: [drawing] } = payload;
    dispatchItem(drawing);
  };
  const handleClearDrawings = () => {
    ClearTool.clear(context);
    dispatchClearItems();
  };

  const channelEventRefs = useRef({
    draw: null,
    clearDrawings: null,
    startRound: null,
  });

  useEffect(() => {
    channelEventRefs.current.draw = channel.on('draw', handleDraw);
    channelEventRefs.current.clearDrawings = channel.on('clear_drawings', handleClearDrawings);
    channelEventRefs.current.startRound = channel.on('start_round', handleClearDrawings);

    return () => {
      channel.off('draw', channelEventRefs.current.draw);
      channel.off('clear_drawings', channelEventRefs.current.clearDrawings);
      channel.off('start_round', channelEventRefs.current.startRound);
    };
  }, []);

  return (
    <div>
      <SketchPad disabled={!isDrawing} />
      {isDrawing ?
        <div>
          <Tools />
          <Options />
        </div>
      : null}
    </div>
  );
};

Canvas.defaultTypes = {
  context: null,
};

Canvas.propTypes = {
  channel: PropTypes.object.isRequired,
  drawing: PropTypes.bool.isRequired,
  context: PropTypes.object,
  dispatchItem: PropTypes.func.isRequired,
  dispatchClearItems: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    channel: game.channel,
    context: game.canvas.context,
  }),
  dispatch => ({
    dispatchItem: addItemAction(dispatch),
    dispatchClearItems: clearItemsAction(dispatch),
  }),
)(Canvas);
