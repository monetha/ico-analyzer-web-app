import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectApp = state => state.get('app');

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.get('location').toJS(),
  );

const selectIsLoading = createSelector(
  selectApp,
  appState => appState.get('isLoading'),
);

export const selectLoaderText = createSelector(
  selectApp,
  appState => appState.get('loaderText'),
);

export const selectCookiePolicyStatus = createSelector(
  selectApp,
  appState => appState.get('cookiePolicyStatus'),
);

export const selectIsPopupVisible = createSelector(
  selectApp,
  appState => appState.getIn(['popup', 'visible']),
);

export const selectPopupMessage = createSelector(
  selectApp,
  appState => appState.getIn(['popup', 'message']),
);

export const selectIsMetamaskEnabled = createSelector(
  selectApp,
  appState => appState.getIn(['metamask', 'enabled']),
);

export const selectIsMetamaskError = createSelector(
  selectApp,
  appState =>
    appState.getIn(['metamask', 'error']) &&
    appState.getIn(['metamask', 'error']).toJS(),
);

export const selectClipboardStatus = clipboardId =>
  createSelector(
    selectApp,
    appState => appState.getIn(['clipboards', clipboardId]),
  );

export const selectClipboards = createSelector(
  selectApp,
  appState => appState.get('clipboards').toJS(),
);

export { makeSelectLocation, selectIsLoading };
