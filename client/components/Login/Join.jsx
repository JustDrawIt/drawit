import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

class JoinGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      joinCode: '',
      error: '',
    };

    this.setJoinCode = this.setJoinCode.bind(this);
    this.join = this.join.bind(this);
  }

  setJoinCode({ target }) {
    this.setState({ joinCode: target.value });
  }

  join() {
    const { joinCode } = this.state;
    if (joinCode.length >= 7) {
      this.props.history.push(`/games/${this.state.joinCode}`);
    } else {
      this.setState({ error: 'Join code must be at least 7 chars long.' });
    }
  }

  render() {
    return (
      <div>
        <input onChange={this.setJoinCode} placeholder="Join code" type="text" />
        <button onClick={this.join}>Play!</button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </div>
    );
  }
}

JoinGame.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default JoinGame;
