import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the icoDetailPage state domain
 */

const selectIcoDetailPageDomain = state => state.get('icoDetail', initialState);

/**
 * Other specific selectors
 */

export const selectFormattedDetails = createSelector(
  selectIcoDetailPageDomain,
  substate => substate.get('formatted'),
);

export const selectRawDetails = createSelector(
  selectIcoDetailPageDomain,
  substate => substate.get('raw'),
);

export const selectCurrentIcoVersion = createSelector(
  selectIcoDetailPageDomain,
  substate => substate.get('currentVersion'),
);

/**
 * Default selector used by IcoDetailPage
 */

const makeSelectIcoDetailPage = () =>
  createSelector(selectIcoDetailPageDomain, substate => substate.toJS());

const makeSelectFormattedIcoDetailPage = () =>
  createSelector(
    selectIcoDetailPageDomain,
    substate => substate.toJS().formatted,
  );

export default makeSelectIcoDetailPage;
export { selectIcoDetailPageDomain, makeSelectFormattedIcoDetailPage };
