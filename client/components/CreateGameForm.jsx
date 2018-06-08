import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import axios from 'axios';
import ReactRouterPropTypes from 'react-router-prop-types';
import Button from './Utils/Button';
import Input from './Utils/Input';

const Container = styled('div')`
  label span {
    display: block;
    text-align: left;
  }
`;

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
    axios.post('/games', { maxPlayers, maxRounds, timePerRound })
      .then(({ data }) => this.props.history.push(`/games/${data.joinCode}`))
      .catch((err) => { console.log(`${err} ERROR`); });
  }


  render() {
    const { error } = this.state;
    const { maxPlayers, maxRounds, timePerRound } = this.state;

    return (
      <Container>
        <div>
          <label htmlFor="max-rounds">
            <span>Max Rounds</span>
            <Input onChange={this.setMaxRounds} id="max-rounds" placeholder={maxRounds} type="number" />
          </label>
        </div>
        <div>
          <label htmlFor="max-players">
            <span>Max Players</span>
            <Input onChange={this.setMaxPlayers} id="max-players" placeholder={maxPlayers} type="number" />
          </label>
        </div>
        <div>
          <label htmlFor="time-per-round">
            <span>Time Per Round</span>
            <Input onChange={this.setTimePerRound} id="time-per-round" placeholder={timePerRound} type="number" />
          </label>
        </div>
        <Button onClick={this.createGame}>Go!</Button>
        {error ? <p>{error}</p> : null}
      </Container>
    );
  }
}

CreateGameForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default CreateGameForm;
