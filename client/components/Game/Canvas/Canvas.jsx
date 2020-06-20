import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SketchPad from './SketchPad';
import Tools from './tools/Tools';
import Options from './options/Options';
import ClearTool from './tools/Clear/ClearTool';

import { addItemAction, clearItemsAction } from '../../../store/actions/game.actions';

class Canvas extends PureComponent {
  constructor(props) {
    super(props);

    this.handleDraw = this.handleDraw.bind(this);
    this.handleClearDrawings = this.handleClearDrawings.bind(this);

    this.channelEventRefs = {};
  }

  componentDidMount() {
    const { channel } = this.props;

    this.channelEventRefs.handleDraw = channel.on('draw', this.handleDraw);
    this.channelEventRefs.clearDrawings = channel.on('clear_drawings', this.handleClearDrawings);
    this.channelEventRefs.roundStart = channel.on('round:start', this.handleClearDrawings);
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.off('draw', this.channelEventRefs.roundDrew);
    channel.off('clear_drawings', this.channelEventRefs.roundClear);
    channel.off('round:start', this.channelEventRefs.roundStart);
  }

  handleDraw({ drawings: [drawing] }) {
    const { dispatchItem } = this.props;
    dispatchItem(drawing);
  }

  handleClearDrawings() {
    const { context, dispatchClearItems } = this.props;

    ClearTool.clear(context);
    dispatchClearItems();
  }

  render() {
    const { drawing } = this.props;

    return (
      <div>
        <SketchPad disabled={!drawing} />
        {drawing ?
          <div>
            <Tools />
            <Options />
          </div>
        : null}
      </div>
    );
  }
}

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
