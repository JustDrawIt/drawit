import React, { PureComponent } from 'react';
import axios from 'axios';
// import ReactRouterPropTypes from 'react-router-prop-types';
import Button from '../Util/Button';
import Input from '../Util/Input';

class CreateGameForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxPlayers: 0,
      maxRounds: 0,
      timePerRound: 0,
      error: '',
    };

    this.setTimePerRound = this.setTimePerRound.bind(this);
    this.setMaxRounds = this.setMaxRounds.bind(this);
    this.setMaxPlayers = this.setMaxPlayers.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  setMaxPlayers({ target }) {
    this.setState({ maxPlayers: target.value });
  }

  setMaxRounds({ target }) {
    this.setState({ maxRounds: target.value });
  }

  setTimePerRound({ target }) {
    this.setState({ timePerRound: target.value });
  }

  createGame() {
    const { maxPlayers, maxRounds, timePerRound } = this.state;
    const newGame = { maxPlayers, maxRounds, timePerRound };
    axios.post('/games', newGame)
      .then((success) => { console.log(`POST SUCCESS ${success}`); })
      .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <div>
        Max Rounds:
        <br />
        <Input onChange={this.setMaxRounds} placeholder="5" type="number" />
        Max Players:
        <br />
        <Input onChange={this.setMaxPlayers} placeholder="5" type="number" />
        Time Per Round:
        <br />
        <Input onChange={this.setTimePerRound} placeholder="2" type="number" />

        <Button onClick={this.createGame}>Go!</Button>
        <span>or</span>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </div>
    );
  }
}

// CreateGameForm.propTypes = {
//   history: ReactRouterPropTypes.history.isRequired,
// };

export default CreateGameForm;
