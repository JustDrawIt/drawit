import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClearTool from './ClearTool';
import ToolButton from '../../../../util/ToolButton';
import socket from '../../../../../sockets';

class Clear extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { context } = this.props;

    if (context) {
      ClearTool.clear(context);
      socket.emit('round:clear');
    }
  }

  render() {
    return (
      <ToolButton onClick={this.onClick}>
        <i className="fas fa-trash-alt" />
      </ToolButton>
    );
  }
}

Clear.defaultProps = {
  context: null,
};

Clear.propTypes = {
  context: PropTypes.object,
};

export default connect(
  ({ game }) => ({
    context: game.canvas.context,
  }),
  null,
)(Clear);
