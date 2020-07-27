import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
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

const StrokeOption = (props) => {
  const { dispatchSize, dispatchStrokeColor } = props;

  const size = useSelector(state => state.game.canvas.options.size);
  const strokeColor = useSelector(state => state.game.canvas.options.strokeColor);

  const handleChangeSize = useCallback((event) => {
    const newSize = Number.parseInt(event.target.value, 10);
    dispatchSize(newSize);
  }, [dispatchSize]);

  const handleChangeColor = useCallback((event) => {
    dispatchStrokeColor(event.target.value);
  }, [dispatchStrokeColor]);

  return (
    <div>
      <ToolButton color={strokeColor} activeColor={strokeColor} className={relativeStyle}>
        <i className="fas fa-tint" />
        <FullInput onChange={handleChangeColor} type="color" />
      </ToolButton>
      <input
        onChange={handleChangeSize}
        value={size}
        step={STEP}
        min={MIN_SIZE}
        max={MAX_SIZE}
        type="range"
      />
    </div>
  );
};

StrokeOption.propTypes = {
  dispatchSize: PropTypes.func.isRequired,
  dispatchStrokeColor: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchSize: setSizeAction(dispatch),
    dispatchStrokeColor: setStrokeColorAction(dispatch),
  }),
)(StrokeOption);
