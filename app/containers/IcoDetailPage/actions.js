/*
 *
 * IcoDetailPage actions
 *
 */

import {
  SET_ICO_DETAILS,
  SET_ICO_DETAIL_BY_FIELD,
  SET_CURRENT_ICO_DETAILS,
  REANALYSE_FINISH,
  REANALYSE_START,
  SWITCH_VERSION,
  SET_CURRENT_ICO_VERSION,
  PREPARE_DETAIL_PAGE,
} from './constants';

export const setIcoDetailByField = (field, value) => ({
  type: SET_ICO_DETAIL_BY_FIELD,
  field,
  value,
});

export const setCurrentIcoDetails = icoPass => ({
  type: SET_CURRENT_ICO_DETAILS,
  icoPass,
});

export const setIcoDetails = icoPass => ({
  type: SET_ICO_DETAILS,
  icoPass,
});

export const reanalyseStart = icoDetails => ({
  type: REANALYSE_START,
  icoDetails,
});

export const prepareDetailPage = passportAddress => ({
  type: PREPARE_DETAIL_PAGE,
  passportAddress,
});

export const reanalyseFinish = () => ({
  type: REANALYSE_FINISH,
});

export const switchVersion = version => ({
  type: SWITCH_VERSION,
  version: parseInt(version, 10),
});

export const setCurrentIcoVersion = version => ({
  type: SET_CURRENT_ICO_VERSION,
  version: parseInt(version, 10),
});
