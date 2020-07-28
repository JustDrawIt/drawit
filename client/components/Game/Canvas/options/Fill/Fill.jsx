import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { css } from 'react-emotion';
import ToolButton from '../../../../Utils/ToolButton';
import FullInput from '../../../../Utils/FullInput';
import { setFillAction, setFillColorAction } from '../../../../../store/actions/game.actions';

const relativeStyle = css`
  position: relative;
`;

const FillOption = (props) => {
  const { dispatchFill, dispatchFillColor } = props;
  const fill = useSelector(state => state.game.canvas.options.fill);
  const fillColor = useSelector(state => state.game.canvas.options.fillColor);

  const handleToggleFill = useCallback(
    () => dispatchFill(!fill),
    [dispatchFill, fill],
  );

  const handleChangeFillColor = useCallback(
    event => dispatchFillColor(event.target.value),
    [dispatchFillColor],
  );

  return (
    <div>
      <ToolButton onClick={handleToggleFill} active={fill} className={relativeStyle}>
        <i className="fas fa-adjust" />
      </ToolButton>
      {fill ? (
        <ToolButton color={fillColor} className={relativeStyle}>
          <i className="fas fa-adjust" />
          <FullInput type="color" onChange={handleChangeFillColor} />
        </ToolButton>
      ) : null}
    </div>
  );
};

FillOption.propTypes = {
  dispatchFill: PropTypes.func.isRequired,
  dispatchFillColor: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchFill: setFillAction(dispatch),
    dispatchFillColor: setFillColorAction(dispatch),
  }),
)(FillOption);
