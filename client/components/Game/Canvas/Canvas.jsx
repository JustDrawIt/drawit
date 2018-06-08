import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import SketchPad from './SketchPad';
import Tools from './tools/Tools';
import Options from './options/Options';
import socket from '../../../sockets';
import { addItemAction } from '../../../store/actions/game.actions';
import ClearTool from './tools/Clear/ClearTool';

const Container = styled('div')`
  padding: 50px;
`;

class Canvas extends PureComponent {
  componentDidMount() {
    const { dispatchItem } = this.props;
    socket.on('round:drew', ({ item }) => dispatchItem(item));
    socket.on('round:cleared', () => ClearTool.clear(this.props.context));
  }

  render() {
    return (
      <Container>
        <SketchPad />
        <div>
          <Tools />
          <Options />
        </div>
      </Container>
    );
  }
}

Canvas.defaultTypes = {
  context: null,
};

Canvas.propTypes = {
  context: PropTypes.object,
  dispatchItem: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    context: game.canvas.context,
  }),
  dispatch => ({
    dispatchItem: addItemAction(dispatch),
  }),
)(Canvas);
