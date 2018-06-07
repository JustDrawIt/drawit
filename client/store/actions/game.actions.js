import { GAME_TYPES } from './types';

export const setNicknameAction = dispatch => nickname => dispatch({
  type: GAME_TYPES.SET_NICKNAME,
  nickname,
});
export const setContextAction = dispatch => context => dispatch({
  type: GAME_TYPES.SET_CONTEXT,
  context,
});
export const setToolAction = dispatch => tool => dispatch({
  type: GAME_TYPES.SET_TOOL,
  tool,
});

export const addItemAction = dispatch => item => dispatch({
  type: GAME_TYPES.ADD_ITEM,
  item,
});
