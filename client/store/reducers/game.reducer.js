import { GAME_TYPES } from '../actions/types';
import { updateOptions } from '../actions/game.actions';
import {
  DEFAULT_SIZE,
  DEFAULT_FILL,
  DEFAULT_STROKE_COLOR,
  DEFAULT_FILL_COLOR,
} from '../../components/Game/Canvas/defaults';

const initialState = {
  nickname: '',
  joinCode: '',
  game: null,
  isAdmin: false,
  started: false,
  canvas: {
    context: null,
    tool: null,
    items: [],
    options: {
      size: DEFAULT_SIZE,
      fill: DEFAULT_FILL,
      strokeColor: DEFAULT_STROKE_COLOR,
      fillColor: DEFAULT_FILL_COLOR,
    },
  },
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_TYPES.SET_NICKNAME:
      return { ...state, nickname: action.nickname };

    case GAME_TYPES.SET_JOIN_CODE:
      return { ...state, joinCode: action.joinCode };

    case GAME_TYPES.SET_GAME:
      return { ...state, game: action.game };

    case GAME_TYPES.SET_IS_ADMIN:
      return { ...state, isAdmin: action.isAdmin };

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
        action.tool.setOptions(state.canvas.options);
      }

      return {
        ...state,
        canvas: {
          ...state.canvas,
          tool: action.tool,
        },
      };

    case GAME_TYPES.SET_SIZE:
      return updateOptions(state, {
        size: action.size,
      });

    case GAME_TYPES.SET_STROKE_COLOR:
      return updateOptions(state, {
        strokeColor: action.strokeColor,
      });

    case GAME_TYPES.SET_FILL:
      return updateOptions(state, {
        fill: action.fill,
      });

    case GAME_TYPES.SET_FILL_COLOR: {
      return updateOptions(state, {
        fillColor: action.fillColor,
      });
    }

    case GAME_TYPES.ADD_ITEM:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          items: [...state.canvas.items, action.item],
        },
      };

    case GAME_TYPES.CLEAR_ITEMS:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          items: [],
        },
      };

    case GAME_TYPES.START:
      return { ...state, started: true };

    default:
      return state;
  }
}
