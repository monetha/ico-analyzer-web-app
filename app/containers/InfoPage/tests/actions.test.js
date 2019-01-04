import { addDisplayMessage } from '../actions';
import { ADD_DISPLAY_MESSAGE } from '../constants';

describe('InfoPage actions', () => {
  describe('Add display message Action', () => {
    it('has a type of Add display message', () => {
      const testMessage = 'testMessage';
      const expected = {
        type: ADD_DISPLAY_MESSAGE,
        message: testMessage,
      };
      expect(addDisplayMessage(testMessage)).toEqual(expected);
    });
  });
});
