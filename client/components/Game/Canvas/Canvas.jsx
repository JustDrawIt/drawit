import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SketchPad from './SketchPad';
import Tools from './tools/Tools';
import Options from './options/Options';
import socket from '../../../sockets';
import { addItemAction, clearItemsAction } from '../../../store/actions/game.actions';
import ClearTool from './tools/Clear/ClearTool';

class Canvas extends PureComponent {
  componentDidMount() {
    const { dispatchItem, dispatchClearItems } = this.props;
    socket.on('round:drew', ({ item }) => dispatchItem(item));
    socket.on('round:cleared', () => {
      ClearTool.clear(this.props.context);
      dispatchClearItems();
    });
  }

  componentWillUnmount() {
    socket.off('round:drew');
    socket.off('round:cleared');
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
  context: PropTypes.object,
  dispatchItem: PropTypes.func.isRequired,
  dispatchClearItems: PropTypes.func.isRequired,
  drawing: PropTypes.bool.isRequired,
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
