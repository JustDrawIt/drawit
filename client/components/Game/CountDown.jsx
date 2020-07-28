import React from 'react';
import PropTypes from 'prop-types';
import { useCountDown } from '../../hooks/useCountDown';

const CountDown = (props) => {
  const { date } = props;
  const { formattedTime } = useCountDown(date, 100);

  return <React.Fragment>{formattedTime}</React.Fragment>;
};

CountDown.propTypes = {
  date: PropTypes.object.isRequired,
};

export default CountDown;
