import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CountDown = (props) => {
  const { date } = props;

  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());

  const interval = useRef(null);
  const handleTick = useCallback(() => {
    if (seconds - 1 < 0) {
      if (minutes - 1 < 0) {
        clearInterval(interval.current);
      } else {
        setMinutes(currMinutes => currMinutes - 1);
        setSeconds(59);
      }
    } else {
      setSeconds(currSeconds => currSeconds - 1);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    interval.current = setInterval(handleTick, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return <div>{minutes}:{formattedSeconds}</div>;
};

CountDown.propTypes = {
  date: PropTypes.object.isRequired,
};

export default CountDown;
