import { combineReducers } from 'redux';
import createGame from './create-game.reducer';
import game from './game.reducer';

export default combineReducers({
  createGame, game,
});
