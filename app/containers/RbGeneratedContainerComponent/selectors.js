import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rbGeneratedContainerComponent state domain
 */

const selectRbGeneratedContainerComponentDomain = state =>
  state.get('rbGeneratedContainerComponent', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RbGeneratedContainerComponent
 */

const makeSelectRbGeneratedContainerComponent = () =>
  createSelector(selectRbGeneratedContainerComponentDomain, substate =>
    substate.toJS(),
  );

export default makeSelectRbGeneratedContainerComponent;
export { selectRbGeneratedContainerComponentDomain };
