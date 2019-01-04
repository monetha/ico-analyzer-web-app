/*
 *
 * IcoList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SELECT_PAGE,
  FETCH_ICO_LIST_REQUEST,
  FETCH_ICO_LIST_FAILURE,
  FETCH_ICO_LIST_SUCCESS,
  FETCH_ICO_LIST_PER_PAGE_REQUEST,
  FETCH_ICO_LIST_PER_PAGE_FAILURE,
  FETCH_ICO_LIST_PER_PAGE_SUCCESS,
  SET_PASSPORT_ADDRESSES,
  SET_PASSPORT_DATA,
} from './constants';

import data from './fixture.json';

export const initialState = fromJS({
  data,
  selectedPage: 0,
  isFetching: false,
  passports: {
    value: [],
    data: {},
    isFetching: false,
  },
});

function icoListReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PAGE:
      return state.set('selectedPage', action.selectedPage);

    case FETCH_ICO_LIST_REQUEST:
      return state.set('isFetching', true);

    case FETCH_ICO_LIST_FAILURE:
      return state.set('isFetching', false).set('error', action.error);

    case FETCH_ICO_LIST_SUCCESS:
      return state.set('isFetching', false);

    case FETCH_ICO_LIST_PER_PAGE_REQUEST:
      return state.setIn(['passports', 'isFetching'], true);

    case FETCH_ICO_LIST_PER_PAGE_FAILURE:
      return state
        .setIn(['passports', 'isFetching'], false)
        .setIn(['passports', 'error'], action.error);

    case FETCH_ICO_LIST_PER_PAGE_SUCCESS:
      return state.setIn(['passports', 'isFetching'], false);

    case SET_PASSPORT_ADDRESSES:
      return state.setIn(['passports', 'value'], action.passportAddresses);

    case SET_PASSPORT_DATA:
      return state.setIn(
        ['passports', 'data', action.passportAddress],
        action.data,
      );

    default:
      return state;
  }
}

export default icoListReducer;
