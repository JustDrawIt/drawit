import types from './types';

export const setNicknameAction = nickname => ({
  type: types.SET_NICKNAME,
  nickname,
});
