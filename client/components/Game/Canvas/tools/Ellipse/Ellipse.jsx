import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import EllipseTool, { TOOL_ELLIPSE } from './EllipseTool';
import ToolButton from '../../../../Utils/ToolButton';

class Ellipse extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { dispatchTool } = this.props;
    const tool = new EllipseTool();

    dispatchTool(tool);
  }

  render() {
    const { active } = this.props;

    return (
      <ToolButton onClick={this.onClick} active={active}>
        <i className="far fa-circle" />
      </ToolButton>
    );
  }
}

Ellipse.propTypes = {
  active: PropTypes.bool.isRequired,
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    active: !!game.canvas.tool && (game.canvas.tool.name === TOOL_ELLIPSE),
  }),
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Ellipse);
