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

    this.socketRefs = {};
  }

  componentDidMount() {
    const { channel } = this.props;

    this.socketRefs.handleDraw = channel.on('draw', this.handleDraw);
    this.socketRefs.clearDrawings = channel.on('clear_drawings', this.handleClearDrawings);
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.off('draw', this.socketRefs.roundDrew);
    channel.off('clear_drawings', this.socketRefs.roundClear);
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
    channel: game.socket,
    context: game.canvas.context,
  }),
  dispatch => ({
    dispatchItem: addItemAction(dispatch),
    dispatchClearItems: clearItemsAction(dispatch),
  }),
)(Canvas);
