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

export const selectisFetchingPassports = createSelector(
  selectIcoListDomain,
  substate => substate.getIn(['passports', 'isFetching']),
);

export const selectPassportFetchError = createSelector(
  selectIcoListDomain,
  substate => substate.get('error'),
);

export const selectfetchedItemIndex = createSelector(
  selectIcoListDomain,
  substate => substate.get('fetchedItemIndex'),
);

export const selectDoneFetchingAllPassports = createSelector(
  selectIcoListDomain,
  substate => substate.get('doneFetchingAllPassports'),
);

export const selectPassportsData = createSelector(
  selectIcoListDomain,
  icoList => icoList.getIn(['passports', 'data']).toJS(),
);

export const selectPassportsDataByPage = createSelector(
  selectIcoListDomain,
  icoList => icoList.getIn(['passports', 'data', icoList.get('selectedPage')]),
);

export const selectAllPassports = createSelector(
  selectPassportsValue,
  selectPassportsData,
  (values, data) => values.map(value => data[value]),
);

export const makeSelectPassports = passportAddresses =>
  createSelector(
    selectPassportsData,
    data => passportAddresses.map(address => data[address]),
  );

export const makeSelectPassport = passportAddress =>
  createSelector(
    selectPassportsData,
    data => data[passportAddress],
  );

export const selectSelectedPage = createSelector(
  selectIcoListDomain,
  substate => substate.get('selectedPage'),
);

/**
 * Default selector used by IcoList
 */

const makeSelectIcoList = () =>
  createSelector(
    selectIcoListDomain,
    substate => substate.toJS(),
  );

export default makeSelectIcoList;
export { selectIcoListDomain };
