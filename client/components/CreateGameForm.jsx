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

  button {
    margin: 10px 0;
    padding: 10px;
  }

  button, input {
    width: 100%;
  }
`;

class CreateGameForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      maxPlayers: 5,
      maxRounds: 5,
      error: null,
    };

    this.setMaxPlayers = this.setMaxPlayers.bind(this);
    this.setMaxRounds = this.setMaxRounds.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;

    axios.get('/auth')
      .then((response) => {
        const { user } = response.data;

        if (!user) {
          history.push('/login');
        } else {
          this.setState({ loggedIn: !!user });
        }
      })
      .catch(() => history.push('/login'));
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
    const { loggedIn, error } = this.state;
    const { maxPlayers, maxRounds } = this.state;

    return loggedIn
      ? (
        <Container>
          <div>
            <label htmlFor="max-rounds">
              <span>Max Rounds</span>
              <Input onChange={this.setMaxRounds} value={maxRounds} id="max-rounds" type="number" />
            </label>
          </div>
          <div>
            <label htmlFor="max-players">
              <span>Max Players</span>
              <Input onChange={this.setMaxPlayers} value={maxPlayers} id="max-players" type="number" />
            </label>
          </div>
          <div>
            <Button onClick={this.createGame}>Go!</Button>
          </div>
          {error ? <p>{error}</p> : null}
        </Container>
      )
      : null;
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
