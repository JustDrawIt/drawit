import { GAME_TYPES } from '../actions/types';

const initialState = {
  nickname: '',
  game: null,
  canvas: {
    context: null,
    tool: null,
    items: [],
  },
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_TYPES.SET_NICKNAME:
      return { ...state, nickname: action.nickname };

    case GAME_TYPES.SET_CONTEXT:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          context: action.context,
        },
      };

    case GAME_TYPES.SET_TOOL:
      if (!action.tool.getContext()) {
        action.tool.setContext(state.canvas.context);
      }

      return {
        ...state,
        canvas: {
          ...state.canvas,
          tool: action.tool,
        },
      };

    case GAME_TYPES.ADD_ITEM:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          items: [...state.canvas.items, action.item],
        },
      };

    default:
      return state;
  }
}
