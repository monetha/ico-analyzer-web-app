/*
 *
 * CreateIco actions
 *
 */

import {
  CREATE_ICO_PASSPORT,
  UNSET_FORM_SUBMISSION_ERROR,
  SET_FORM_SUBMISSION_ERROR,
  SET_PRIVATE_KEY,
  CREATE_ICO_PASSPORT_SUCCESS,
} from './constants';

export const createIcoPassport = () => ({
  type: CREATE_ICO_PASSPORT,
});

export const createIcoPassportSuccess = () => ({
  type: CREATE_ICO_PASSPORT_SUCCESS,
});

export const setFormSumbissionError = error => ({
  type: SET_FORM_SUBMISSION_ERROR,
  error,
});

export const setPrivateKey = privateKey => ({
  type: SET_PRIVATE_KEY,
  privateKey,
});

export const unsetFormSumbissionError = () => ({
  type: UNSET_FORM_SUBMISSION_ERROR,
});
