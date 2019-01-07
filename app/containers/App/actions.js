/*
 *
 * EditIcoPage actions
 *
 */
import {
  REDIRECT,
  START_LOADER,
  STOP_LOADER,
  SET_METAMASK_ENABLED,
  ENABLE_METAMASK_FAILURE,
  ENABLE_METAMASK_REQUEST,
  ENABLE_METAMASK_SUCCESS,
  HIDE_COPY_TO_CLIPBOARD,
  SHOW_COPY_TO_CLIPBOARD,
  ADD_TO_CLIPBOARD,
  SHOW_POPUP,
  HIDE_POPUP,
  POPUP_ACCEPTED,
  ACCEPT_COOKIE_POLICY,
  CHECK_COOKIE_POLICY_STATUS,
  SET_COOKIE_POLICY_STATUS,
} from './constants';

export const startLoader = message => ({
  type: START_LOADER,
  message,
});

export const stopLoader = () => ({
  type: STOP_LOADER,
});

export const showPopup = message => ({
  type: SHOW_POPUP,
  message,
});

export const hidePopup = () => ({
  type: HIDE_POPUP,
});

export const popupAccepted = () => ({
  type: POPUP_ACCEPTED,
});

export const acceptCookiePolicy = () => ({
  type: ACCEPT_COOKIE_POLICY,
});

export const checkCookiePolicyStatus = () => ({
  type: CHECK_COOKIE_POLICY_STATUS,
});

export const setCookiePolicyStatus = status => ({
  type: SET_COOKIE_POLICY_STATUS,
  status,
});

export const redirect = path => ({
  type: REDIRECT,
  path,
});

export const setMetamaskEnabled = () => ({
  type: SET_METAMASK_ENABLED,
});

export const addToClipboard = (clipboardId, text, timeout = 3000) => ({
  type: ADD_TO_CLIPBOARD,
  clipboardId,
  text,
  timeout,
});

export const showCopyToClipboard = clipboardId => ({
  type: SHOW_COPY_TO_CLIPBOARD,
  clipboardId,
});

export const hideCopyToClipboard = clipboardId => ({
  type: HIDE_COPY_TO_CLIPBOARD,
  clipboardId,
});

export const enableMetamaskRequest = () => ({
  type: ENABLE_METAMASK_REQUEST,
});

export const enableMetamaskFailure = error => ({
  type: ENABLE_METAMASK_FAILURE,
  error,
});

export const enableMetamaskSuccess = data => ({
  type: ENABLE_METAMASK_SUCCESS,
  data,
});
