import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToolAction } from '../../../../../store/actions/game.actions';
import PencilTool from './PencilTool';

class Pencil extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { dispatchTool } = this.props;
    const tool = new PencilTool();

    dispatchTool(tool);
  }

  render() {
    return (
      <button onClick={this.onClick}>Pencil</button>
    );
  }
}

Pencil.propTypes = {
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Pencil);
