import types from '../actions/types';

const gameDefaultState = {
  nickname: '',
};

export default function gameReducer(state = gameDefaultState, action) {
  switch (action.type) {
    case types.SET_NICKNAME:
      console.log(action.nickname);
      return { ...state, nickname: action.nickname };

    default:
      return state;
  }
}
