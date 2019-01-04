import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the redirectHandler state domain
 */

export const selectRedirectHandlerDomain = state =>
  state.get('redirectHandler', initialState);

export const selectRedirectPath = createSelector(
  selectRedirectHandlerDomain,
  substate => substate.get('redirectPath'),
);

export const selectRedirectPageName = createSelector(
  selectRedirectHandlerDomain,
  substate => substate.get('pageName'),
);

export const selectRedirectTimeout = createSelector(
  selectRedirectHandlerDomain,
  substate => substate.get('timeout'),
);

/**
 * Default selector used by RedirectHandler
 */

const makeSelectRedirectHandler = () =>
  createSelector(selectRedirectHandlerDomain, substate => substate.toJS());

export default makeSelectRedirectHandler;
