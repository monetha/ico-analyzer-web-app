import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editIcoPage state domain
 */

const selectEditIcoPageDomain = state => state.get('editIcoPage', initialState);

/**
 * Other specific selectors
 */

export const selectAnalyseFormErrors = createSelector(
  selectEditIcoPageDomain,
  substate => substate.get('errors').toJS(),
);

export const selectFormSubmissionErrors = createSelector(
  selectEditIcoPageDomain,
  substate => substate.getIn(['errors', 'submit']).toJS(),
);

export const selectDecimals = createSelector(
  selectEditIcoPageDomain,
  substate => substate.get('decimals'),
);

export const selectPassportAddress = createSelector(
  selectEditIcoPageDomain,
  substate => substate.get('passportAddress'),
);

/**
 * Default selector used by EditIcoPage
 */

const makeSelectEditIcoPage = () =>
  createSelector(
    selectEditIcoPageDomain,
    substate => substate.toJS(),
  );

export default makeSelectEditIcoPage;
export { selectEditIcoPageDomain };
