import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rbGeneratedContainerStateless state domain
 */

const selectRbGeneratedContainerStatelessDomain = state =>
  state.get('rbGeneratedContainerStateless', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RbGeneratedContainerStateless
 */

const makeSelectRbGeneratedContainerStateless = () =>
  createSelector(selectRbGeneratedContainerStatelessDomain, substate =>
    substate.toJS(),
  );

export default makeSelectRbGeneratedContainerStateless;
export { selectRbGeneratedContainerStatelessDomain };
