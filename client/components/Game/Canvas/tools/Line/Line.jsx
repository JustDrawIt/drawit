import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToolAction } from '../../../../../store/actions/game.actions';
import LineTool from './LineTool';

class Line extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { dispatchTool } = this.props;
    const tool = new LineTool();

    dispatchTool(tool);
  }

  render() {
    return (
      <button onClick={this.onClick}>Line</button>
    );
  }
}

Line.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Line);
