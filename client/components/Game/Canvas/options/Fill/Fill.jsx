import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import ToolButton from '../../../../Utils/ToolButton';
import FullInput from '../../../../Utils/FullInput';
import { setFillAction, setFillColorAction } from '../../../../../store/actions/game.actions';

const relativeStyle = css`
  position: relative;
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
          <i className="fas fa-adjust" />
        </ToolButton>
        {fill ? (
          <ToolButton color={fillColor} className={relativeStyle}>
            <i className="fas fa-adjust" />
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
