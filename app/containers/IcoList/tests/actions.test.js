import { fetchIcoListRequest } from '../actions';
import { FETCH_ICO_LIST_REQUEST } from '../constants';

describe('IcoList actions', () => {
  describe('Fetch ico list request Action', () => {
    it('has a type of FETCH_ICO_LIST_REQUEST', () => {
      const expected = {
        type: FETCH_ICO_LIST_REQUEST,
      };
      expect(fetchIcoListRequest()).toEqual(expected);
    });
  });
});
