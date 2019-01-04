import icoDetailPageReducer, { initialState } from '../reducer';

describe('icoDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(icoDetailPageReducer(undefined, {})).toEqual(initialState);
  });
});
