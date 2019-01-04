import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the icoList state domain
 */

const selectIcoListDomain = state => state.get('icoList', initialState);

/**
 * Other specific selectors
 */

export const selectPassportsValue = createSelector(
  selectIcoListDomain,
  substate => substate.getIn(['passports', 'value']),
);

export const selectPassportsData = createSelector(
  selectIcoListDomain,
  substate => substate.getIn(['passports', 'data']).toJS(),
);

export const selectAllPassports = createSelector(
  selectPassportsValue,
  selectPassportsData,
  (values, data) => values.map(value => data[value]),
);

export const makeSelectPassports = passportAddresses =>
  createSelector(selectPassportsData, data =>
    passportAddresses.map(address => data[address]),
  );

export const makeSelectPassport = passportAddress =>
  createSelector(selectPassportsData, data => data[passportAddress]);

export const selectSelectedPage = createSelector(
  selectIcoListDomain,
  substate => substate.get('selectedPage'),
);

/**
 * Default selector used by IcoList
 */

const makeSelectIcoList = () =>
  createSelector(selectIcoListDomain, substate => substate.toJS());

export default makeSelectIcoList;
export { selectIcoListDomain };
