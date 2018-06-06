import types from './types';

export const setNickname = nickname => ({
  type: types.SET_NICKNAME,
  nickname,
});
