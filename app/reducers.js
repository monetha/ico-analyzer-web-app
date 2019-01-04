/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import appReducer from 'containers/App/reducer';
import editIcoPage from 'containers/EditIcoPage/reducer';
import createIco from 'containers/CreateIco/reducer';
import icoDetail from 'containers/IcoDetailPage/reducer';
import icoList from 'containers/IcoList/reducer';
import infoPage from 'containers/InfoPage/reducer';
import redirectHandler from 'containers/RedirectHandler/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    app: appReducer,
    editIcoPage,
    createIco,
    icoDetail,
    icoList,
    infoPage,
    redirectHandler,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
