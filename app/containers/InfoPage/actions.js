/*
 *
 * InfoPage actions
 *
 */

import { ADD_DISPLAY_MESSAGE, SET_INFO_TYPE, RESET_INFO } from './constants';

export const addDisplayMessage = message => ({
  type: ADD_DISPLAY_MESSAGE,
  message,
});

export const setInfoType = infoType => ({
  type: SET_INFO_TYPE,
  infoType,
});

export const resetInfo = () => ({
  type: RESET_INFO,
});
