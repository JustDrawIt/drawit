import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SketchPad from './SketchPad';
import Tools from './tools/Tools';
import Options from './options/Options';
import ClearTool from './tools/Clear/ClearTool';

import socket from '../../../sockets';
import { addItemAction, clearItemsAction } from '../../../store/actions/game.actions';

class Canvas extends PureComponent {
  constructor(props) {
    super(props);

    this.onRoundDrew = this.onRoundDrew.bind(this);
    this.onRoundCleared = this.onRoundCleared.bind(this);
  }

  componentDidMount() {
    socket.on('round:drew', this.onRoundDrew);
    socket.on('round:cleared', this.onRoundCleared);
  }

  componentWillUnmount() {
    socket.off('round:drew', this.onRoundDrew);
    socket.off('round:cleared', this.onRoundCleared);
  }

  onRoundDrew({ item }) {
    const { dispatchItem } = this.props;
    dispatchItem(item);
  }

  onRoundCleared() {
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
  drawing: PropTypes.bool.isRequired,
  context: PropTypes.object,
  dispatchItem: PropTypes.func.isRequired,
  dispatchClearItems: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    context: game.canvas.context,
  }),
  dispatch => ({
    dispatchItem: addItemAction(dispatch),
    dispatchClearItems: clearItemsAction(dispatch),
  }),
)(Canvas);
