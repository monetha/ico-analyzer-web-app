import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rbGeneratedContainerPureComponent state domain
 */

const selectRbGeneratedContainerPureComponentDomain = state =>
  state.get('rbGeneratedContainerPureComponent', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RbGeneratedContainerPureComponent
 */

const makeSelectRbGeneratedContainerPureComponent = () =>
  createSelector(selectRbGeneratedContainerPureComponentDomain, substate =>
    substate.toJS(),
  );

export default makeSelectRbGeneratedContainerPureComponent;
export { selectRbGeneratedContainerPureComponentDomain };
