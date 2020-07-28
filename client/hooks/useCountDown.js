import { useState } from 'react';
import { useInterval } from './useInterval';

export const useCountDown = (startDate, interval = 1000) => {
  const [minutes, setMinutes] = useState(startDate.getMinutes());
  const [seconds, setSeconds] = useState(startDate.getSeconds());

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTime = `${minutes}:${formattedSeconds}`;

  const isOver = minutes === 0 && seconds === 0;

  useInterval(() => {
    if (seconds - 1 < 0) {
      if (minutes - 1 < 0) {
        clearInterval(interval);
      } else {
        setMinutes(currMinutes => currMinutes - 1);
        setSeconds(59);
      }
    } else {
      setSeconds(currSeconds => currSeconds - 1);
    }
  }, isOver ? null : interval);

  return { minutes, seconds, formattedTime };
};

export default useCountDown;
