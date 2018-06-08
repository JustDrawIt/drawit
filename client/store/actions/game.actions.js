import { GAME_TYPES } from './types';

export const setNicknameAction = dispatch => nickname => dispatch({
  type: GAME_TYPES.SET_NICKNAME,
  nickname,
});
export const setJoinCodeAction = dispatch => joinCode => dispatch({
  type: GAME_TYPES.SET_JOIN_CODE,
  joinCode,
});
export const setContextAction = dispatch => context => dispatch({
  type: GAME_TYPES.SET_CONTEXT,
  context,
});
export const setToolAction = dispatch => tool => dispatch({
  type: GAME_TYPES.SET_TOOL,
  tool,
});
export const setFillAction = dispatch => fill => dispatch({
  type: GAME_TYPES.SET_FILL,
  fill,
});
export const setFillColorAction = dispatch => fillColor => dispatch({
  type: GAME_TYPES.SET_FILL_COLOR,
  fillColor,
});

export const addItemAction = dispatch => item => dispatch({
  type: GAME_TYPES.ADD_ITEM,
  item,
});

export const clearItemsAction = dispatch => () => dispatch({
  type: GAME_TYPES.CLEAR_ITEMS,
});
