/*
 *
 * CreateIco reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_FORM_SUBMISSION_ERROR,
  UNSET_FORM_SUBMISSION_ERROR,
  SET_PRIVATE_KEY,
} from './constants';

export const initialState = fromJS({
  error: undefined,
  privateKey: '',
});

function createIcoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_SUBMISSION_ERROR:
      return state.set('error', action.error);

    case UNSET_FORM_SUBMISSION_ERROR:
      return state.delete('error');

    case SET_PRIVATE_KEY:
      return state.set('privateKey', action.privateKey);

    default:
      return state;
  }
}

export default createIcoReducer;
