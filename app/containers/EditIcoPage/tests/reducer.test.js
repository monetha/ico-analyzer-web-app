import editIcoPageReducer, { initialState } from '../reducer';

describe('editIcoPageReducer', () => {
  it('returns the initial state', () => {
    expect(editIcoPageReducer(undefined, {})).toEqual(initialState);
  });
});
