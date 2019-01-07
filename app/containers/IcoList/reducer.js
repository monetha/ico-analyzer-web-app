/*
 *
 * IcoList reducer
 *
 */

import { fromJS, List } from 'immutable';
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
  ADD_PASSPORTS_DATA,
  SET_DONE_FETCHING_FOR_ALL_PASSPORTS,
  SET_FETCHED_ITEM_INDEX,
  CLEAR_PASSPORTS_DATA,
} from './constants';

export const initialState = fromJS({
  selectedPage: 0,
  isFetching: false,
  fetchedItemIndex: -1,
  doneFetchingAllPassports: false,
  passports: {
    value: [],
    data: [],
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

    case SET_DONE_FETCHING_FOR_ALL_PASSPORTS:
      return state.set('doneFetchingAllPassports', true);

    case SET_FETCHED_ITEM_INDEX:
      return state.set('fetchedItemIndex', action.fetchedItemIndex);

    case FETCH_ICO_LIST_PER_PAGE_REQUEST:
      return state.setIn(['passports', 'isFetching'], true);

    case FETCH_ICO_LIST_PER_PAGE_FAILURE:
      return state
        .setIn(['passports', 'isFetching'], false)
        .setIn(['passports', 'error'], action.error);

    case FETCH_ICO_LIST_PER_PAGE_SUCCESS:
      return state.setIn(['passports', 'isFetching'], false);

    case ADD_PASSPORTS_DATA:
      return state.setIn(
        ['passports', 'data'],
        state.getIn(['passports', 'data']).push(List(action.data)),
      );

    case SET_PASSPORT_ADDRESSES:
      return state.setIn(['passports', 'value'], action.passportAddresses);

    case SET_PASSPORT_DATA:
      return state.setIn(
        ['passports', 'data', action.passportAddress],
        action.data,
      );

    case CLEAR_PASSPORTS_DATA:
      return initialState;

    default:
      return state;
  }
}

export default icoListReducer;
