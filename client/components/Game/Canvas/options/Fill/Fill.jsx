import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import ToolButton from '../../../../util/ToolButton';
import { setFillAction, setFillColorAction } from '../../../../../store/actions/game.actions';

const relativeStyle = css`
  position: relative;
`;
const FullInput = styled('input')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

class FillOption extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.setFillColor = this.setFillColor.bind(this);
  }

  onClick() {
    const { fill, dispatchFill } = this.props;

    dispatchFill(!fill);
  }

  setFillColor({ target }) {
    const { dispatchFillColor } = this.props;
    const { value } = target;

    dispatchFillColor(value);
  }

  render() {
    const { fill, fillColor } = this.props;

    return (
      <div>
        <ToolButton onClick={this.onClick} active={fill} className={relativeStyle}>
          <i className="fas fa-tint" />
          <FullInput type="checkbox" />
        </ToolButton>
        {fill ? (
          <ToolButton color={fillColor} className={relativeStyle}>
            <i className="fas fa-tint" />
            <FullInput type="color" onChange={this.setFillColor} />
          </ToolButton>
        ) : null}
      </div>
    );
  }
}

FillOption.propTypes = {
  fill: PropTypes.bool.isRequired,
  fillColor: PropTypes.string.isRequired,
  dispatchFill: PropTypes.func.isRequired,
  dispatchFillColor: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    fill: game.canvas.options.fill,
    fillColor: game.canvas.options.fillColor,
  }),
  dispatch => ({
    dispatchFill: setFillAction(dispatch),
    dispatchFillColor: setFillColorAction(dispatch),
  }),
)(FillOption);