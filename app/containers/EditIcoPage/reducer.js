/*
 *
 * EditIcoPage reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';
import {
  UPDATE_FORM_DATA,
  RESET_FORM_DATA,
  SET_PASSPORT_ADDRESS,
  SET_FORM_DATA_ERROR,
  UNSET_FORM_DATA_ERROR,
  SET_FORM_SUBMISSION_ERROR,
  UNSET_FORM_SUBMISSION_ERROR,
} from './constants';

export const initialState = fromJS({
  passportAddress: '',
  version: undefined,
  icoName: '',
  decimals: '',
  tokenContractAddress: '',
  ownerAddress: '',
  crowdsaleAddress: '',
  icoStartDate: moment(),
  icoEndDate: moment(),
  errors: {},
});

function editIcoPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORM_DATA:
      return state.set(action.key, action.payload);

    case RESET_FORM_DATA:
      return initialState;

    case SET_PASSPORT_ADDRESS:
      return state.set('passportAddress', action.passportAddress);

    case SET_FORM_DATA_ERROR:
      return state.setIn(['errors', action.key], action.error);

    case UNSET_FORM_DATA_ERROR:
      return state.deleteIn(['errors', action.key]);

    case SET_FORM_SUBMISSION_ERROR:
      return state.setIn(['errors', 'submit'], action.error);

    case UNSET_FORM_SUBMISSION_ERROR:
      return state.deleteIn(['errors', 'submit']);

    default:
      return state;
  }
}

export default editIcoPageReducer;
