import createGameReducer from '../reducers/create-game.reducer';

describe('Create Game Reducer', () => {
  test('returns the default state when action type does not match any case', () => {
    const currentState = {};
    const action = {};
    const newState = createGameReducer(currentState, action);

    expect(newState).toBe(currentState);
  });
});
