import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the infoPage state domain
 */

const selectInfoPageDomain = state => state.get('infoPage', initialState);

/**
 * Other specific selectors
 */

export const selectMessages = createSelector(selectInfoPageDomain, substate =>
  substate.get('messages').toJS(),
);

export const selectInfoType = createSelector(selectInfoPageDomain, substate =>
  substate.get('infoType'),
);

/**
 * Default selector used by InfoPage
 */

const makeSelectInfoPage = () =>
  createSelector(selectInfoPageDomain, substate => substate.toJS());

export default makeSelectInfoPage;
export { selectInfoPageDomain };
