/*
 *
 * InfoPage reducer
 *
 */

import { fromJS } from 'immutable';
import { ADD_DISPLAY_MESSAGE, SET_INFO_TYPE, RESET_INFO } from './constants';

export const initialState = fromJS({
  messages: [],
  infoType: undefined,
});

function infoPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DISPLAY_MESSAGE:
      return state.set('messages', state.get('messages').push(action.message));

    case SET_INFO_TYPE:
      return state.set('infoType', action.infoType);

    case RESET_INFO:
      return initialState;

    default:
      return state;
  }
}

export default infoPageReducer;
