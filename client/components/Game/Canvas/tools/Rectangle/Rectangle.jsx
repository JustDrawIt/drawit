import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToolAction } from '../../../../../store/actions/game.actions';
import RectangleTool from './RectangleTool';

class Rectangle extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { dispatchTool } = this.props;
    const tool = new RectangleTool();

    dispatchTool(tool);
  }

  render() {
    return (
      <button onClick={this.onClick}>Rectangle</button>
    );
  }
}

Rectangle.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Rectangle);
