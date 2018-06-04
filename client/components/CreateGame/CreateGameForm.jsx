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
      .then(({ data }) => { console.log(data); })
      .catch((err) => { console.log(`${err} ERROR`); });
  }


  render() {
    return (
      <div>
        Max Rounds:
        <Input onChange={this.setMaxRounds} placeholder="5" type="number" />
        <br />
        Max Players:
        <Input onChange={this.setMaxPlayers} placeholder="5" type="number" />
        <br />
        Time Per Round:
        <Input onChange={this.setTimePerRound} placeholder="2" type="number" />
        <br />
        <Button onClick={this.createGame}>Go!</Button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </div>
    );
  }
}

// CreateGameForm.propTypes = {
//   history: ReactRouterPropTypes.history.isRequired,
// };

export default CreateGameForm;
