import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import axios from '../axios';
import Button from './Utils/Button';
import Input from './Utils/Input';
import { setGameAction, setIsAdminAction } from '../store/actions/game.actions';

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
      maxPlayers: 5,
      maxRounds: 5,
      error: null,
    };

    this.setMaxPlayers = this.setMaxPlayers.bind(this);
    this.setMaxRounds = this.setMaxRounds.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  setMaxPlayers({ target }) {
    this.setState({ maxPlayers: target.value });
  }

  setMaxRounds({ target }) {
    this.setState({ maxRounds: target.value });
  }

  createGame() {
    const { maxPlayers, maxRounds } = this.state;
    const { dispatchGame, dispatchIsAdmin } = this.props;

    axios.post('/games', { maxPlayers, maxRounds })
      .then((response) => {
        const { game } = response.data;

        dispatchGame(game);
        dispatchIsAdmin(true);

        this.props.history.push(`/games/${game.joinCode}`);
      })
      .catch(({ response }) => {
        const { error } = response.data;
        this.setState({ error });
      });
  }

  render() {
    const { error } = this.state;
    const { maxPlayers, maxRounds } = this.state;

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
        <Button onClick={this.createGame}>Go!</Button>
        {error ? <p>{error}</p> : null}
      </Container>
    );
  }
}

CreateGameForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  dispatchGame: PropTypes.func.isRequired,
  dispatchIsAdmin: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => ({
    dispatchGame: setGameAction(dispatch),
    dispatchIsAdmin: setIsAdminAction(dispatch),
  }),
)(CreateGameForm);
