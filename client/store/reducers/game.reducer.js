import types from '../actions/types';

const initialState = {
  nickname: '',
  game: null,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NICKNAME:
      return { ...state, nickname: action.nickname };
    default:
      return state;
  }
}
