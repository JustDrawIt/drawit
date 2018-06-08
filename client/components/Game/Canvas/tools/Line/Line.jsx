import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setToolAction } from '../../../../../store/actions/game.actions';
import LineTool, { TOOL_LINE } from './LineTool';
import ToolButton from '../../../../Utils/ToolButton';

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
    const { active } = this.props;

    return (
      <ToolButton onClick={this.onClick} active={active}>
        <i className="fas fa-ruler" />
      </ToolButton>
    );
  }
}

Line.propTypes = {
  active: PropTypes.bool.isRequired,
  dispatchTool: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    active: !!game.canvas.tool && (game.canvas.tool.name === TOOL_LINE),
  }),
  dispatch => ({
    dispatchTool: setToolAction(dispatch),
  }),
)(Line);
