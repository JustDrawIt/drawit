import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import ToolButton from '../../../../Utils/ToolButton';
import FullInput from '../../../../Utils/FullInput';
import { setSizeAction, setStrokeColorAction } from '../../../../../store/actions/game.actions';

const relativeStyle = css`
  position: relative;
`;

const MIN_SIZE = 2;
const MAX_SIZE = 18;
const STEP = 2;

class StrokeOption extends PureComponent {
  constructor(props) {
    super(props);

    this.changeSize = this.changeSize.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  changeSize(event) {
    const { dispatchSize } = this.props;
    const { value } = event.target;
    const size = Number(value);

    dispatchSize(size);
  }

  changeColor(event) {
    const { dispatchStrokeColor } = this.props;
    const { value } = event.target;

    dispatchStrokeColor(value);
  }

  render() {
    const { size, strokeColor } = this.props;

    return (
      <div>
        <ToolButton color={strokeColor} activeColor={strokeColor} className={relativeStyle}>
          <i className="fas fa-tint" />
          <FullInput onChange={this.changeColor} type="color" />
        </ToolButton>
        <input
          onChange={this.changeSize}
          value={size}
          step={STEP}
          min={MIN_SIZE}
          max={MAX_SIZE}
          type="range"
        />
      </div>
    );
  }
}

StrokeOption.propTypes = {
  size: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  dispatchSize: PropTypes.func.isRequired,
  dispatchStrokeColor: PropTypes.func.isRequired,
};

export default connect(
  ({ game }) => ({
    size: game.canvas.options.size,
    strokeColor: game.canvas.options.strokeColor,
  }),
  dispatch => ({
    dispatchSize: setSizeAction(dispatch),
    dispatchStrokeColor: setStrokeColorAction(dispatch),
  }),
)(StrokeOption);
