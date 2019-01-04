import { SET_REDIRECT_TIMEOUT } from '../constants';
import { setRedirectTimeout } from '../actions';

describe('RedirectHandler actions', () => {
  describe('Set Redirect Timeout Action', () => {
    it('has a type of SET_REDIRECT_TIMEOUT', () => {
      const timeout = 1;
      const expected = {
        type: SET_REDIRECT_TIMEOUT,
        timeout,
      };
      expect(setRedirectTimeout(timeout)).toEqual(expected);
    });
  });
});
