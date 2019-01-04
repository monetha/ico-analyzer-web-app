import infoPageReducer, { initialState } from '../reducer';

describe('infoPageReducer', () => {
  it('returns the initial state', () => {
    expect(infoPageReducer(undefined, {})).toEqual(initialState);
  });
});
