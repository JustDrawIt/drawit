import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class CountDown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      minutes: props.date.getMinutes(),
      seconds: props.date.getSeconds(),
    };

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { minutes, seconds } = this.state;

      if (seconds - 1 < 0) {
        if (minutes - 1 < 0) {
          clearInterval(this.interval);
        } else {
          this.setState({ minutes: minutes - 1, seconds: 59 });
        }
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { minutes, seconds } = this.state;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return <div>{minutes}:{formattedSeconds}</div>;
  }
}

CountDown.propTypes = {
  date: PropTypes.object.isRequired,
};

export default CountDown;
