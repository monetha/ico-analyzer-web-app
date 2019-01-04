/*
 *
 * IcoList actions
 *
 */

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
  SET_PASSPORTS_DATA,
  NAVIGATE_ICO_DETAILS,
  FETCH_PASSPORT_DETAILS_FOR_CURRENT_PAGE,
} from './constants';

export const selectPage = selectedPage => ({
  type: SELECT_PAGE,
  selectedPage,
});

export const fetchIcoListRequest = () => ({
  type: FETCH_ICO_LIST_REQUEST,
});

export const fetchIcoListFailure = error => ({
  type: FETCH_ICO_LIST_FAILURE,
  error,
});

export const fetchIcoListSuccess = data => ({
  type: FETCH_ICO_LIST_SUCCESS,
  data,
});

export const fetchIcoListPerPageRequest = () => ({
  type: FETCH_ICO_LIST_PER_PAGE_REQUEST,
});

export const fetchIcoListPerPageFailure = error => ({
  type: FETCH_ICO_LIST_PER_PAGE_FAILURE,
  error,
});

export const fetchIcoListPerPageSuccess = data => ({
  type: FETCH_ICO_LIST_PER_PAGE_SUCCESS,
  data,
});

export const setPassportAddresses = passportAddresses => ({
  type: SET_PASSPORT_ADDRESSES,
  passportAddresses,
});

export const setPassportData = (passportAddress, data) => ({
  type: SET_PASSPORT_DATA,
  passportAddress,
  data,
});

export const setPassportsData = (passportAddress, data) => ({
  type: SET_PASSPORTS_DATA,
  passportAddress,
  data,
});

export const fetchPassportDetailsForCurrentPage = () => ({
  type: FETCH_PASSPORT_DETAILS_FOR_CURRENT_PAGE,
});

export const navigateToIcoDetails = icoPass => ({
  type: NAVIGATE_ICO_DETAILS,
  icoPass,
});
