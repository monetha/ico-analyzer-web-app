import { analyseNewIco } from '../actions';
import { ANALYSE_NEW_ICO } from '../constants';

describe('EditIcoPage actions', () => {
  describe('Analyse New Ico Action', () => {
    it('has a type of ANALYSE_NEW_ICO', () => {
      const expected = {
        type: ANALYSE_NEW_ICO,
      };
      expect(analyseNewIco()).toEqual(expected);
    });
  });
});
