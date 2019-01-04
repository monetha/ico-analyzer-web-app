/*
 *
 * EditIcoPage actions
 *
 */
import {
  ANALYSE_NEW_ICO,
  REANALYSE_NEW_ICO,
  UPDATE_FORM_DATA,
  RESET_FORM_DATA,
  SET_PASSPORT_ADDRESS,
  SET_FORM_DATA_ERROR,
  UNSET_FORM_DATA_ERROR,
  SET_FORM_SUBMISSION_ERROR,
  UNSET_FORM_SUBMISSION_ERROR,
  PREPARE_TO_EDIT_ICOPASS_FINISH,
  PREPARE_TO_EDIT_ICOPASS_START,
  PREFILL_EDIT_ICOPASS_FORM,
} from './constants';

export const updateFormData = (key, payload) => ({
  type: UPDATE_FORM_DATA,
  key,
  payload,
});

export const resetFormData = () => ({
  type: RESET_FORM_DATA,
});

export const setFormDataError = (key, error) => ({
  type: SET_FORM_DATA_ERROR,
  key,
  error,
});

export const unsetFormDataError = key => ({
  type: UNSET_FORM_DATA_ERROR,
  key,
});

export const setFormSumbissionError = error => ({
  type: SET_FORM_SUBMISSION_ERROR,
  error,
});

export const unsetFormSumbissionError = () => ({
  type: UNSET_FORM_SUBMISSION_ERROR,
});

export const analyseNewIco = () => ({
  type: ANALYSE_NEW_ICO,
});

export const reanalyseIco = () => ({
  type: REANALYSE_NEW_ICO,
});

export const prepareToEditIcopassFinish = () => ({
  type: PREPARE_TO_EDIT_ICOPASS_FINISH,
});

export const prepareToEditIcopassStart = () => ({
  type: PREPARE_TO_EDIT_ICOPASS_START,
});

export const setPassportAddress = passportAddress => ({
  type: SET_PASSPORT_ADDRESS,
  passportAddress,
});

export const prefillEditIcopassForm = (fields, icoDetails) => ({
  type: PREFILL_EDIT_ICOPASS_FORM,
  fields,
  icoDetails,
});
