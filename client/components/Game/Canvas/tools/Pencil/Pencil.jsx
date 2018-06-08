import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import PencilTool, { TOOL_PENCIL } from './PencilTool';
import ToolButton from '../../../../Utils/ToolButton';

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
    const { active } = this.props;

    return (
      <ToolButton onClick={this.onClick} active={active}>
        <i className="fas fa-pencil-alt" />
      </ToolButton>
    );
  }
}

Pencil.propTypes = {
  active: PropTypes.bool.isRequired,
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    active: !!game.canvas.tool && (game.canvas.tool.name === TOOL_PENCIL),
  }),
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Pencil);
