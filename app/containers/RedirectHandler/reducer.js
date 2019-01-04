/*
 *
 * RedirectHandler reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_REDIRECT_PATH,
  UNSET_REDIRECT_PATH,
  SET_REDIRECT_TIMEOUT,
  SET_REDIRECT_PAGE_NAME,
} from './constants';

export const initialState = fromJS({
  redirectPath: undefined,
  timeout: 0,
  pageName: '',
});

function redirectHandlerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REDIRECT_PATH:
      return state.set('redirectPath', action.redirectPath);

    case UNSET_REDIRECT_PATH:
      return state.set('redirectPath', undefined);

    case SET_REDIRECT_TIMEOUT:
      return state.set('timeout', action.timeout);

    case SET_REDIRECT_PAGE_NAME:
      return state.set('pageName', action.pageName);

    default:
      return state;
  }
}

export default redirectHandlerReducer;
