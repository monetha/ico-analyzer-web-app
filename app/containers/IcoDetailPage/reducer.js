/*
 *
 * IcoDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_ICO_DETAIL_BY_FIELD,
  SET_CURRENT_ICO_DETAILS,
  SET_ICO_DETAILS,
  SET_CURRENT_ICO_VERSION,
} from './constants';

export const initialState = fromJS({
  raw: {},
  formatted: undefined,
  currentVersion: undefined,
});

function icoDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ICO_DETAIL_BY_FIELD:
      return state.setIn(['formatted', action.field], action.value);

    case SET_ICO_DETAILS:
      return state.set('raw', action.icoPass);

    case SET_CURRENT_ICO_DETAILS:
      return state.set('formatted', action.icoPass);

    case SET_CURRENT_ICO_VERSION:
      return state.set('currentVersion', action.version);

    default:
      return state;
  }
}

export default icoDetailPageReducer;
