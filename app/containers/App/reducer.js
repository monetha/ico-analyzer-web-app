/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START_LOADER,
  STOP_LOADER,
  SET_METAMASK_ENABLED,
  ENABLE_METAMASK_FAILURE,
  ENABLE_METAMASK_REQUEST,
  ENABLE_METAMASK_SUCCESS,
  HIDE_COPY_TO_CLIPBOARD,
  SHOW_COPY_TO_CLIPBOARD,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  loaderText: undefined,
  clipboards: {},
  metamask: {
    enabled: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADER:
      return state.set('isLoading', true).set('loaderText', action.message);

    case STOP_LOADER:
      return state.set('isLoading', false).delete('loaderText');

    case SET_METAMASK_ENABLED:
      return state.setIn(['metamask', 'enabled'], true);

    case SHOW_COPY_TO_CLIPBOARD:
      return state.setIn(['clipboards', action.clipboardId], true);

    case HIDE_COPY_TO_CLIPBOARD:
      return state.setIn(['clipboards', action.clipboardId], false);

    case ENABLE_METAMASK_REQUEST:
      return state.setIn(['metamask', 'enabled'], false);

    case ENABLE_METAMASK_FAILURE:
      return state.set('error', action.error);

    case ENABLE_METAMASK_SUCCESS:
      return state.setIn(['metamask', 'enabled'], true);

    default:
      return state;
  }
}

export default appReducer;
