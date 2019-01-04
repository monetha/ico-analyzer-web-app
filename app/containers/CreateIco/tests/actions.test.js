import { createIcoPassport } from '../actions';
import { CREATE_ICO_PASSPORT } from '../constants';

describe('CreateIco actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: CREATE_ICO_PASSPORT,
      };
      expect(createIcoPassport()).toEqual(expected);
    });
  });
});
