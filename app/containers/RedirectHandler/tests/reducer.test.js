import redirectHandlerReducer, { initialState } from '../reducer';

describe('redirectHandlerReducer', () => {
  it('returns the initial state', () => {
    expect(redirectHandlerReducer(undefined, {})).toEqual(initialState);
  });
});
