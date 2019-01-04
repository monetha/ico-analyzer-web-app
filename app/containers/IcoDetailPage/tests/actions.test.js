import { reanalyseStart } from '../actions';
import { REANALYSE_START } from '../constants';

describe('IcoDetailPage actions', () => {
  describe('ReanalyseStart Action', () => {
    it('has a type of REANALYSE_START', () => {
      const expected = {
        type: REANALYSE_START,
      };
      expect(reanalyseStart()).toEqual(expected);
    });
  });
});
