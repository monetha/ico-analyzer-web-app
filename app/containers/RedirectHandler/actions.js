/*
 *
 * RedirectHandler actions
 *
 */

import {
  SET_REDIRECT_PATH,
  UNSET_REDIRECT_PATH,
  SET_REDIRECT_TIMEOUT,
  SET_REDIRECT_PAGE_NAME,
} from './constants';

export const setRedirectPath = redirectPath => ({
  type: SET_REDIRECT_PATH,
  redirectPath,
});

export const unsetRedirectPath = () => ({
  type: UNSET_REDIRECT_PATH,
});

export const setRedirectTimeout = timeout => ({
  type: SET_REDIRECT_TIMEOUT,
  timeout,
});

export const setRedirectPageName = pageName => ({
  type: SET_REDIRECT_PAGE_NAME,
  pageName,
});
