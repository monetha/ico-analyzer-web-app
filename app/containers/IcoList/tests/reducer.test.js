import icoListReducer, { initialState } from '../reducer';

describe('icoListReducer', () => {
  it('returns the initial state', () => {
    expect(icoListReducer(undefined, {})).toEqual(initialState);
  });
});
