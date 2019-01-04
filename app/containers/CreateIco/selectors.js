import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createIco state domain
 */

const selectCreateIcoDomain = state => state.get('createIco', initialState);

/**
 * Other specific selectors
 */

export const selectSubmissionError = createSelector(
  selectCreateIcoDomain,
  substate => substate.get('error'),
);

export const selectPrivateKey = createSelector(
  selectCreateIcoDomain,
  substate => substate.get('privateKey'),
);

/**
 * Default selector used by CreateIco
 */

const makeSelectCreateIco = () =>
  createSelector(selectCreateIcoDomain, substate => substate.toJS());

export default makeSelectCreateIco;
export { selectCreateIcoDomain };
