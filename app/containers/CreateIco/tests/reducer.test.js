import createIcoReducer, { initialState } from '../reducer';

describe('createIcoReducer', () => {
  it('returns the initial state', () => {
    expect(createIcoReducer(undefined, {})).toEqual(initialState);
  });
});
